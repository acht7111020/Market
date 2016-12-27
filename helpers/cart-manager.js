module.exports = function CartManager(fb_id) {
  Cart = require('../models/cart-schema');
  this.add = function(item) {
    Cart.findOne({fb_id: fb_id}, function(err, cart) {
      if (err) throw err;
      if (cart) {

      }
      else {
        cart = new Cart({fb_id: fb_id, items: {}, totalQty: 0, totalPrice: 0});
      }
      var storedItem = cart.items[item.id];
      if (!storedItem){
        storedItem = cart.items[item.id] = {item: item, qty: 0, price: 0};
      }
      storedItem.qty ++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      // console.log(storedItem);
      cart.items[item.id] = storedItem;
      cart.totalQty ++;
      cart.totalPrice += storedItem.item.price;
      cart.markModified('items');
      cart.save(function(err, updatedChart) {
        if (err) throw err;
        console.log(updatedChart);
      });
    });
  }



  // if (docs.length > 0){
  //   this.items = docs.items;
  //   this.totalQty = docs.totalQty;
  //   this.totalPrice = docs.totalPrice;
  // }
  // else {
  //   this.items = {};
  //   this.totalQty = 0;
  //   this.totalPrice = 0;
  // }
  //
  // this.add = function(item) {
  //   var storedItem = this.items[item._id];
  //   if (!storedItem){
  //     storedItem = this.items[item.id] = {item: item, qty: 0, price: 0};
  //   }
  //   storedItem.qty ++;
  //   storedItem.price = storedItem.item.price * storedItem.qty;
  //   this.totalQty ++;
  //   this.totalPrice += storedItem.price;
  // }
  //
  // this.generateArray = function() {
  //   var arr = [];
  //   for (var id in this.items){
  //     arr.push(this.items[id]);
  //   }
  // }
};
