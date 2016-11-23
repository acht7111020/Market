var Product = require('../models/product-schema');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/Market')

var imagePathPrefix = '/images/products/'

var products = [
  new Product({
    title: 'windrunner',
    coverImagePath: `${imagePathPrefix}windrunner-1.jpg`,
    contentImagePath: [`${imagePathPrefix}windrunner-1.jpg`, `${imagePathPrefix}windrunner-2.jpg`],
    price: 75,
    description: 'Good for runners',
    position: 1
  }),
  new Product({
    title: 'kobe11',
    coverImagePath: `${imagePathPrefix}kobe11-1.jpg`,
    contentImagePath: [`${imagePathPrefix}kobe11-1.jpg`, `${imagePathPrefix}kobe11-1.jpg`],
    price: 180,
    description: 'Good for basketball players',
    position: 2
  }),
  new Product({
    title: 'z-force 2',
    coverImagePath: `${imagePathPrefix}zf2-1.jpg`,
    contentImagePath: [`${imagePathPrefix}zf2-1.jpg`],
    price: 120,
    description: 'Good for professional badminton players',
    position: 3
  })
];
var done = 0;
for (var i = 0; i < products.length; i++){
  products[i].save(function(err, result){
    done ++;
    if (done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
