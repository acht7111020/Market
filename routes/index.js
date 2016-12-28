var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var expressHbs = require('express-handlebars');
var RoutesLogic = require('../config/routes-logic');

router.get('/', RoutesLogic, function(req, res, next) {
  var findQueryA = Store.find({"status.level":"G", "status.area":"A"});
  var findQueryB = Store.find({"status.level":"G", "status.area":"B"});
  var findQueryC = Store.find({"status.level":"G", "status.area":"C"});
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
        res.render('index', req.renderValues);
      });
    });
  });

});

router.get('/:level/', RoutesLogic, function(req, res, next) {
  var findQueryA = Store.find({"status.level":req.params.level, "status.area":"A"});
  var findQueryB = Store.find({"status.level":req.params.level, "status.area":"B"});
  var findQueryC = Store.find({"status.level":req.params.level, "status.area":"C"});
  var allstores;
  //db.stores.find({"status.area":"A"})
  findQueryA.sort('position').exec(function(storeErr, storeDocsA) {
    findQueryB.sort('position').exec(function(storeErr, storeDocsB) {
      findQueryC.sort('position').exec(function(storeErr, storeDocsC) {
        //allstores = [storeDocsA, storeDocsB, storeDocsC];
        req.renderValues.storesA = storeDocsA;
        req.renderValues.storesB = storeDocsB;
        req.renderValues.storesC = storeDocsC;
        req.session.level = req.params.level;
        req.renderValues.leftbarTitle = req.params.level;
        req.renderValues.leftbarImg = '/images/online-store.png';
        res.render('index', req.renderValues);
      });
    });
  });

});

module.exports = router;
