module.exports = function ModifyProduct() {
  var Product = require('./product-schema');

  this.add = function(body, files, storeID, productID) {
    Product.findById(productID, function(err, product) {
      // var newProduct = {
      //   title: body.title,
      //   coverImagePath: files[0].path,
      //   contentImagePath: files.map(function(item) {return item.path;}),
      //   price: Number(body.price),
      //   description: body.description
      // };
      var imagePathPrefix = '/images/products/'
      var newProduct = {
        title: 'windrunner',
        coverImagePath: `${imagePathPrefix}windrunner-1.jpg`,
        contentImagePath: [`${imagePathPrefix}windrunner-1.jpg`, `${imagePathPrefix}windrunner-2.jpg`],
        price: 75,
        description: 'Good for runners',
        position: 1
      };
      if (!product) {
        product = new Product(newProduct);
      }
      else{
        product = newProduct;
      }
      product.save(function(err, updatedProduct) {
        if (err) throw err;
        console.log(updatedProduct);
      });
    });
  }
};
