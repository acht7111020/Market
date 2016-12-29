var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  fromUser: String,
  toUser: String,
  msg: String,
  read: Boolean,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', schema);
