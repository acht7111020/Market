var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  score: Number
});

module.exports = mongoose.model('Player', schema);
