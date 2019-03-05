const express = require('express');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.render('launchpage');
});

router.get('/team', (req, res) => {
  res.render('team');
});

module.exports = router;
