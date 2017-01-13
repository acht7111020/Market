var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  level: Number,
  leaderboard: []
});

module.exports = mongoose.model('Leaderboard', schema);
