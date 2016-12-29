var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var expressHbs = require('express-handlebars');
var RoutesLogic = require('../config/routes-logic');

router.get('/', RoutesLogic, function(req, res, next) {
  var findQueryA = Store.find({"status.level":req.session.level, "status.area":"A"});
  var findQueryB = Store.find({"status.level":req.session.level, "status.area":"B"});
  var findQueryC = Store.find({"status.level":req.session.level, "status.area":"C"});

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

router.post('/', RoutesLogic, function(req, res, next) {
  req.session.level = req.body.level;
  res.redirect('/loading');
});

router.get('/loading', RoutesLogic, function(req, res, next) {
  req.renderValues.level = req.session.level;
  req.renderValues.leftbarTitle = 'loading';
  req.renderValues.leftbarImg = '/images/online-store.png';
  res.render('load/loading', req.renderValues);
});



module.exports = router;
