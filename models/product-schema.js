var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true},
  coverImagePath: {type: String, required: true},
  contentImagePath: {type: [String], required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  position: {type: Number}
});

module.exports = mongoose.model('Product', schema);
