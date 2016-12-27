var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user-schema');
var RoutesLogic = require('../config/routes-logic');
var Store = require('../models/store-schema');

var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/logout', RoutesLogic, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/profile/:id', RoutesLogic, function(req, res) {
  User.findById(req.params.id, function(userErr, user) {
    if(userErr) throw userErr;
    if (user) {
      Store.find({'detail.owner': req.params.id}, function(storeErr, stores) {
        if (storeErr) throw storeErr;
        if (stores) {
          req.renderValues.buyerRating = ['#ED8A19', '#ED8A19', '#ED8A19', '#ED8A19', '#bdbdbd'];
          req.renderValues.sellerRating = ['#ED8A19', '#ED8A19', '#ED8A19', '#bdbdbd', '#bdbdbd'];
          req.renderValues.profileUser = user.facebook;
          req.renderValues.profileOwnedStores = stores;
          // console.log(user);
          res.render('user/profile', req.renderValues);
        }
        else res.redirect('/');
      });
    }
    else res.redirect('/');
  });
});

module.exports = router;
