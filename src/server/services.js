const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

/* GET services page. */
router.get('/', (req, res) => {
  res.render('services');
});

module.exports = router;
