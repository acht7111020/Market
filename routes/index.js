var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var expressHbs = require('express-handlebars');
var RoutesLogic = require('../config/routes-logic');

router.get('/', RoutesLogic, function(req, res, next) {
  var findQuery = Store.find();
  findQuery.sort('position').exec(function(storeErr, storeDocs) {
    req.renderValues.stores = storeDocs;
    req.renderValues.leftbarTitle = 'G Floor';
    req.renderValues.leftbarImg = '/images/online-store.png';
    console.log(req.session.level);
    res.render('index', req.renderValues);
  });
});

module.exports = router;
