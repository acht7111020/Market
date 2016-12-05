module.exports = function ModifyProduct() {
  var Product = require('./product-schema');

  this.modify = function(body, files, storeID, productID) {
    var picPaths = files.map(function(item) {return item.path;});
    console.log(body.description);
    Product.findById(productID, function(err, product) {
      var imagePathPrefix = '/images/products/';
      var uploadPathPrefix = '/uploads/';
      var newProduct = {
        title: body.title,
        coverImagePath: uploadPathPrefix + files[0].filename,
        contentImagePath: files.map(function(item) {return uploadPathPrefix + item.filename;}),
        price: body.price,
        description: body.description,
        ownerStore: storeID
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
