const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillSchema = new Schema({
  technical: Boolean,
  name: String,
});

const roleSchema = new Schema({
  title: String,
  description: String
});

const socialSchema = new Schema({
  socialplatform: String,
  url: String
});

const ProfileSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  resume: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  avatar: {
    data: Buffer,
    contentType: String
  },
  about: {
    type: String
  },
  personal_interest: {
    type: String
  },
  career_interest: {
    type: String
  },
  jobinterest: Boolean,
  technologies: [skillSchema],
  roles: [roleSchema],
  socialmedia: [socialSchema]
});

// eslint-disable-next-line consistent-return
ProfileSchema.pre('save', function () { // eslint-disable-line func-names
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
