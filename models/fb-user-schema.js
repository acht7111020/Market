var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
  id: String,
  token: String,
  email: String,
  name: String
});

module.exports = mongoose.model('FB-User', schema);
