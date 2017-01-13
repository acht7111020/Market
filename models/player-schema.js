var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  score: Number,
  level: Number,
  difficulty: Number
});

module.exports = mongoose.model('Player', schema);
