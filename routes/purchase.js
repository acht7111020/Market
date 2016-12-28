var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var PurchaseManager = require('../helpers/purchase-manager');
var RoutesLogic = require('../config/routes-logic');
/* GET home page. */
router.get('/', RoutesLogic, function(req, res, next) {
  var findQueryA = Store.find({"status.area":"A"});
  var findQueryB = Store.find({"status.area":"B"});
  var findQueryC = Store.find({"status.area":"C"});
  var allstores;
  //db.stores.find({"status.area":"A"})
  findQueryA.sort('position').exec(function(storeErr, storeDocsA) {
    findQueryB.sort('position').exec(function(storeErr, storeDocsB) {
      findQueryC.sort('position').exec(function(storeErr, storeDocsC) {
        //allstores = [storeDocsA, storeDocsB, storeDocsC];
        req.renderValues.storesA = storeDocsA;
        req.renderValues.storesB = storeDocsB;
        req.renderValues.storesC = storeDocsC;
        req.renderValues.leftbarTitle = req.session.level;
        req.renderValues.leftbarImg = '/images/online-store.png';
        res.render('purchase/purchase', req.renderValues);
      });
    });
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
