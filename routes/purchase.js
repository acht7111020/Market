var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var PurchaseManager = require('../helpers/purchase-manager');
var RoutesLogic = require('../config/routes-logic');
/* GET home page. */
router.get('/', RoutesLogic, function(req, res, next) {
  var findQuery = Store.find();
  findQuery.sort('position').exec(function(storeErr, stores){
    if(storeErr) throw storeErr;
    req.renderValues.stores = stores;
    req.renderValues.leftbarTitle = 'G Floor';
    req.renderValues.leftbarImg = '/images/online-store.png';
    res.render('purchase/purchase', req.renderValues);
  });
});

router.get('/buying-store/:id', RoutesLogic, function(req, res, next) {
  Store.findById(req.params.id, function(err, doc) {
    if (err) {
      res.redirect('/');
    };
    req.renderValues.product = doc;
    var purchaseManager = new PurchaseManager(req.params.id, req.user.username);
    purchaseManager.add(doc);
    res.redirect('/purchase');
  });
});



module.exports = router;
