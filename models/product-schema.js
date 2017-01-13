var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  coverImagePath: String,
  contentImagePath: [String],
  price: Number,
  description: String,
  ownerStore: Schema.Types.ObjectId
});

module.exports = mongoose.model('Product', schema);
