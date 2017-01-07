var express = require('express');
var router = express.Router();
var Player = require('../models/player-schema');

router.get('/leaderboard', function(req, res) {
  Player.find(function(err, players) {
    var leaderboard = {
      leaderboard: players,
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
    var findQuery = Player.find();
    findQuery.sort('-score').exec(function(err, players) {
      var rate = players.length;
      for(var i = 0; i < players.length; i++) {
        if (newPlayer.score == players[i].score) {
          rate = i + 1;
          break;
        }
      }
      var leaderboard = {
        leaderboard: players,
        myRate: rate
      }
      console.log(leaderboard);
      res.json(leaderboard);
    });
  });
});

module.exports = router;
