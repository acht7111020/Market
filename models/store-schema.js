var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  available :{type: Boolean, required: true},
  ownerEmail :{type: String, required: false},
  sellPrice :{type: String, require: true},
  title: {type: String, required: true},
  coverImagePath: {type: String, required: true},
  contentImagePath: {type: [String], required: true},
  detailedPath: {type: String, required: true},
  position: {type: Number, required: true},
  products: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Store', schema);
