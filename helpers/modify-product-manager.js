module.exports = function ModifyProduct() {
  var Product = require('../models/product-schema');

  this.add = function(body, files, storeID) {
    var uploadPathPrefix = '/uploads/products/';
    var newProduct = new Product({
      title: body.title,
      coverImagePath: uploadPathPrefix + files[0].filename,
      contentImagePath: files.map(function(item) {return uploadPathPrefix + item.filename;}),
      price: body.price,
      description: body.description,
      ownerStore: storeID
    });
    newProduct.save(function(err, updatedProduct) {
      if (err) throw err;
    });
  };

  this.modify = function(body, files, productID) {
    Product.findById(productID, function(err, product) {
      var uploadPathPrefix = '/uploads/products/';
      var picPaths = product.contentImagePath;
      if (files.length > 0){
        picPaths = picPaths.concat(files.map(function(item) {return uploadPathPrefix + item.filename}));
      }
      product.title = body.title;
      product.coverImagePath = picPaths[0];
      product.contentImagePath = picPaths;
      product.price = body.price;
      product.description = body.description;
      product.save(function(err, updatedProduct) {
        if (err) redirect('/');
      });
    });
  };
};
