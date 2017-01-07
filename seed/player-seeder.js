var Player = require('../models/player-schema');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/Market');

var players = [
  new Player ({
    name: 'Andy',
    score: 20
  }),
  new Player ({
    name: 'Lee',
    score: 20
  })
];
var done = 0;
for (var i = 0; i < players.length; i++){
  players[i].save(function(err, result){
    done ++;
    if (done === players.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
