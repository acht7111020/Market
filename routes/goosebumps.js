var express = require('express');
var router = express.Router();
var Player = require('../models/player-schema');

router.get('/leaderboard', function(req, res) {
  Player.find(function(err, players) {
    var leaderboard = {
      leaderboard: players
    }
    res.json(leaderboard);
  });
});

// router.post('/leaderboard', function(req, res) {
//
// });

module.exports = router;
