var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  status: {
    rented: Boolean,
    level: String,
    area: String,
    position: Number,
    price: Number,
    pageView: Number
  },
  detail: {
    title: String,
    owner: String,
    coverImage: String,
    contentImage: String,
    description: String
  }
});

module.exports = mongoose.model('Store', schema);
