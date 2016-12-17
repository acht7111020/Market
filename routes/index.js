var express = require('express');
var router = express.Router();
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var expressHbs = require('express-handlebars');

router.get('/', isLoggedIn, function(req, res, next) {
  var findQuery = Store.find();
  findQuery.sort('position').exec(function(storeErr, storeDocs) {
    req.renderValues.stores = storeDocs;
    res.render('index', req.renderValues);
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.renderValues = {
      title: "Ballon",
      fb_user: req.user.facebook
    }
    return next();
  }
  else {
    res.render('index', {title: "Ballon"});
  }
}
