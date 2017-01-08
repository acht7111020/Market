var express = require('express');
var router = express.Router();
var Player = require('../models/player-schema');
var Leaderboard = require('../models/leaderboord-schema');

// router.get('/leaderboard/:level', function(req, res) {
//   Player.find({level: req.params.level}, function(err, players) {
//     var leaderboard = {
//       leaderboard: players,
//     }
//     res.json(leaderboard);
//   });
// });

router.post('/leaderboard', function(req, res) {
  console.log(req.body);
  var newPlayer = new Player({
    name: req.body.name,
    score: req.body.score,
    level: req.body.level,
    difficulty: req.body.difficulty
  });
  newPlayer.save(function(err) {
    if (err) throw err;
    var findQuery = Player.find({level: req.body.level, difficulty: req.doby.difficulty});
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
