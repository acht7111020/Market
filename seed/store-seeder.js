var Store = require('../models/store-schema');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/Market')

var imagePathPrefix = '/images/stores/'

var stores = [
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'A',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'A',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'A',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: 'G',
      area: 'A',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: 'G',
      area: 'A',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: 'G',
      area: 'A',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: 'G',
      area: 'A',
      position: 7
    },
    // detail: {
    //   title: 'Puma',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}puma-1.jpg`,
    //   contentImage: [`${imagePathPrefix}puma-1.jpg`,`${imagePathPrefix}puma-2.jpg`],
    //   description: 'This is a Puma store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'B',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'B',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'B',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: 'G',
      area: 'B',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: 'G',
      area: 'B',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: 'G',
      area: 'B',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: 'G',
      area: 'B',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'C',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'C',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: 'G',
      area: 'C',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: 'G',
      area: 'C',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: 'G',
      area: 'C',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: 'G',
      area: 'C',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: 'G',
      area: 'C',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'A',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'A',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'A',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '2',
      area: 'A',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '2',
      area: 'A',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '2',
      area: 'A',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '2',
      area: 'A',
      position: 7
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'B',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'B',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'B',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '2',
      area: 'B',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '2',
      area: 'B',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '2',
      area: 'B',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '2',
      area: 'B',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'C',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'C',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '2',
      area: 'C',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '2',
      area: 'C',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '2',
      area: 'C',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '2',
      area: 'C',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '2',
      area: 'C',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'A',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'A',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'A',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '3',
      area: 'A',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '3',
      area: 'A',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '3',
      area: 'A',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '3',
      area: 'A',
      position: 7
    },
    // detail: {
    //   title: 'Puma',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}puma-1.jpg`,
    //   contentImage: [`${imagePathPrefix}puma-1.jpg`,`${imagePathPrefix}puma-2.jpg`],
    //   description: 'This is a Puma store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'B',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'B',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'B',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '3',
      area: 'B',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '3',
      area: 'B',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '3',
      area: 'B',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '3',
      area: 'B',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'C',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'C',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '3',
      area: 'C',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '3',
      area: 'C',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '3',
      area: 'C',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '3',
      area: 'C',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '3',
      area: 'C',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'A',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'A',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'A',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '4',
      area: 'A',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '4',
      area: 'A',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '4',
      area: 'A',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '4',
      area: 'A',
      position: 7
    },
    // detail: {
    //   title: 'Puma',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}puma-1.jpg`,
    //   contentImage: [`${imagePathPrefix}puma-1.jpg`,`${imagePathPrefix}puma-2.jpg`],
    //   description: 'This is a Puma store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'B',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'B',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'B',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '4',
      area: 'B',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '4',
      area: 'B',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '4',
      area: 'B',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '4',
      area: 'B',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'C',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'C',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '4',
      area: 'C',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '4',
      area: 'C',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '4',
      area: 'C',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '4',
      area: 'C',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '4',
      area: 'C',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'A',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'A',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'A',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '5',
      area: 'A',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '5',
      area: 'A',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '5',
      area: 'A',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '5',
      area: 'A',
      position: 7
    },
    // detail: {
    //   title: 'Puma',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}puma-1.jpg`,
    //   contentImage: [`${imagePathPrefix}puma-1.jpg`,`${imagePathPrefix}puma-2.jpg`],
    //   description: 'This is a Puma store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'B',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'B',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'B',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '5',
      area: 'B',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '5',
      area: 'B',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '5',
      area: 'B',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '5',
      area: 'B',
      position: 7
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'C',
      position: 1
    },
    // detail: {
    //   title: 'Adidas',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}adidas-1.jpg`,
    //   contentImage: [`${imagePathPrefix}adidas-1.jpg`,`${imagePathPrefix}adidas-2.jpg`],
    //   description: 'This is a Adidas store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'C',
      position: 2
    },
    // detail: {
    //   title: 'Converse',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}converse-1.jpg`,
    //   contentImage: [`${imagePathPrefix}converse-1.jpg`,`${imagePathPrefix}converse-2.jpg`],
    //   description: 'This is a Converse store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '300000000',
      level: '5',
      area: 'C',
      position: 3
    },
    // detail: {
    //   title: 'Jordan',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}jordan-1.jpg`,
    //   contentImage: [`${imagePathPrefix}jordan-1.jpg`,`${imagePathPrefix}jordan-2.jpg`],
    //   description: 'This is a Jordan store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '5',
      area: 'C',
      position: 4
    },
    // detail: {
    //   title: 'New Balance',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}newbalance-1.jpg`,
    //   contentImage: [`${imagePathPrefix}newbalance-1.jpg`,`${imagePathPrefix}newbalance-2.jpg`],
    //   description: 'This is a New Balance store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '20000000',
      level: '5',
      area: 'C',
      position: 5
    },
    // detail: {
    //   title: 'Nike',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}nike-1.jpg`,
    //   contentImage: [`${imagePathPrefix}nike-1.jpg`,`${imagePathPrefix}nike-2.jpg`],
    //   description: 'This is a Nike store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '100000000',
      level: '5',
      area: 'C',
      position: 6
    },
    // detail: {
    //   title: 'Under Armour',
    //   owner: '1270063206384939',
    //   coverImage: `${imagePathPrefix}underarmour-1.jpg`,
    //   contentImage: [`${imagePathPrefix}underarmour-1.jpg`,`${imagePathPrefix}underarmour-2.jpg`],
    //   description: 'This is a Under Armour store'
    // }
  }),
  new Store({
    status: {
      rented: false,
      price: '400000000',
      level: '5',
      area: 'C',
      position: 7
    }
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
