const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

const team = require('./team.controller');

// http://domain/api/{user:id}/dashboard
router.get('/', team.team);

router.get('/jasminehubert', team.jasminehubert);

router.get('/fodediop', team.fode);

router.get('/kendramoore', team.kendra);

router.get('/sukrob', team.sukrob);

router.get('/jasmineanderson', team.jasmineanderson);

module.exports = router;
