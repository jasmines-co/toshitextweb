const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const adminSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 12
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 12
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

// eslint-disable-next-line consistent-return
adminSchema.pre('save', function (next) { // eslint-disable-line func-names
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const admin = this;
  if (!admin.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(admin.password, salt, (hash) => {
      admin.password = hash;
      next();
    });
  });
});

// Need to write pre hash func
// Need to use function to enable this.password to work
// eslint-disable-next-line func-names
adminSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('admin', adminSchema);
