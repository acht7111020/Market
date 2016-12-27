module.exports = function CartManager(userId) {
  var Cart = require('../models/cart-schema');
  var Product = require('../models/product-schema');
  this.add = function(item) {
    Cart.findOne({userId: userId}, function(err, cart) {
      if (err) throw err;
      if (!cart) {
        cart = new Cart({userId: userId, items: {}, totalQty: 0});
      }
      var storedItem = cart.items[item.id];
      if (!storedItem){
        storedItem = cart.items[item.id] = {item: item, qty: 0};
      }
      storedItem.qty ++;
      cart.items[item.id] = storedItem;
      cart.totalQty ++;
      cart.markModified('items');
      cart.save(function(err, updatedCart) {
        if (err) throw err;
        console.log(updatedCart);
      });
    });
  }

  this.updatePrices = function() {
    Cart.findOne({userId: userId}, function(err, cart) {
      if (err) throw err;
      var itemIds = [];
      for (var item in cart.items){
        itemIds.push({_id: item});
      }
      console.log(itemIds);
      Product.find({$or: itemIds}, function(err, products) {
        cart.totalPrice = 0;
        for (i = 0; i < products.length; i++) {
          cart.items[products[i]._id].item = products[i];
          cart.items[products[i]._id].price = products[i].price * cart.items[products[i]._id].qty;
          cart.totalPrice += cart.items[products[i]._id].price;
        }
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
