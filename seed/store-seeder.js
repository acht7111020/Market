var Store = require('../models/store-schema');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/Market')

var imagePathPrefix = '/images/stores/'

var stores = [
  new Store({
    available: true,
    sellPrice: '$300,000,000',
    ownerEmail: '',
    title: 'adidas',
    coverImagePath: `${imagePathPrefix}adidas-1.jpg`,
    contentImagePath: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    detailedPath: "/store/adidas",
    position: 1
  }),
  new Store({
    available: false,
    sellPrice: '$300,000,000',
    ownerEmail: '',
    title: 'converse',
    coverImagePath: `${imagePathPrefix}converse-1.jpg`,
    contentImagePath: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    detailedPath: "/store/converse",
    position: 2
  }),
  new Store({
    available: true,
    sellPrice: '$300,000,000',
    ownerEmail: '',
    title: 'jordan',
    coverImagePath: `${imagePathPrefix}jordan-1.jpg`,
    contentImagePath: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    detailedPath: "/store/jordan",
    position: 3
  }),
  new Store({
    available: true,
    sellPrice: '$100,000,000',
    ownerEmail: '',
    title: 'newbalance',
    coverImagePath: `${imagePathPrefix}newbalance-1.jpg`,
    contentImagePath: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    detailedPath: "/store/newbalance",
    position: 4
  }),
  new Store({
    available: true,
    sellPrice: '$200,000,000',
    ownerEmail: '',
    title: 'nike',
    coverImagePath: `${imagePathPrefix}nike-1.jpg`,
    contentImagePath: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    detailedPath: "/store/nike",
    position: 5
  }),
  new Store({
    available: false,
    sellPrice: '$100,000,000',
    ownerEmail: '',
    title: 'underarmour',
    coverImagePath: `${imagePathPrefix}underarmour-1.jpg`,
    contentImagePath: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    detailedPath: "/store/underarmour",
    position: 6
  }),
  new Store({
    available: false,
    sellPrice: '$400,000,000',
    ownerEmail: '',
    title: 'puma',
    coverImagePath: `${imagePathPrefix}puma-1.jpg`,
    contentImagePath: [`${imagePathPrefix}puma-1.jpg`,`${imagePathPrefix}puma-2.jpg`],
    detailedPath: "/store/puma",
    position: 7
  })
];
var done = 0;
for (var i = 0; i < stores.length; i++){
  stores[i].save(function(err, result){
    done ++;
    if (done === stores.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
