var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  userId: {type: String, required: true},
  items: {type: {}, required: true},
  totalQty: {type: Number, required: true}
});

module.exports = mongoose.model('Cart', schema);
