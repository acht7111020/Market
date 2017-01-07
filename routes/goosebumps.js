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

router.post('/leaderboard', function(req, res) {
  console.log(req.body);
  var newPlayer = new Player({
    name: req.body.name,
    score: req.body.score
  });
  newPlayer.save(function(err) {
    if (err) throw err;
    console.log(newPlayer);
    Player.find(function(playerErr, players) {
      var leaderboard = {
        leaderboard: players
      }
      res.json(leaderboard);
    });
  });
});

module.exports = router;
