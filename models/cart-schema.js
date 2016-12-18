var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  fb_id: {type: String, required: true},
  items: {type: {}, required: true},
  totalQty: {type: Number, required: true},
  totalPrice: {type: Number, required: true}
});

module.exports = mongoose.model('Cart', schema);
