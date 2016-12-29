var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    profilePic: String,
    friends: []
  }
});

module.exports = mongoose.model('User', schema);
