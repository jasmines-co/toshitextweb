const express = require('express');
// const adminRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

const team = require('./server/team/team.route')

router.get('/', (res) => {
  res.render('launchpage');
});

router.use('/team', team);

router.use('/admin', (res) => {
  // eslint-disable-next-line no-undef
  adminlayout = 'adminlayout.hbs';
  // eslint-disable-next-line no-undef
  res.render('launchpage', { layout: adminlayout });
});

module.exports = router;
