module.exports = function CartManager(userEmail) {
  Cart = require('./cart-schema');
  Cart.find({userEmail: userEmail}, function(err, docs) {
    if (err) throw err;
    if (docs.length > 0){
      this.items = docs.items;
      this.totalQty = docs.totalQty;
      this.totalPrice = docs.totalPrice;
    }
    else {
      this.items = {};
      this.totalQty = 0;
      this.totalPrice = 0;
    }

    this.add = function(item) {
      var storedItem = this.items[item._id];
      if (!storedItem){
        storedItem = this.items[item.id] = {item: item, qty: 0, price: 0};
      }
      storedItem.qty ++;
      storedItem.price = storedItem.item.price * storedItem.qty;
      this.totalQty ++;
      this.totalPrice += storedItem.price;
    }

    this.generateArray = function() {
      var arr = [];
      for (var id in this.items){
        arr.push(this.items[id]);
      }
    }

  });
};
