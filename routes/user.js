var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user-schema');
var RoutesLogic = require('../config/routes-logic');

var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/logout', RoutesLogic, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/profile/:id', RoutesLogic, function(req, res) {
  User.findOne({'facebook.id': req.params.id}, function(err, user) {
    if(err) throw err;
    req.renderValues.buyerRating = ['#ED8A19', '#ED8A19', '#ED8A19', '#ED8A19', '#bdbdbd'];
    req.renderValues.sellerRating = ['#ED8A19', '#ED8A19', '#ED8A19', '#bdbdbd', '#bdbdbd'];
    req.renderValues.profileUser = user.facebook;
    console.log(user);
    res.render('user/profile', req.renderValues);
  });
});

module.exports = router;
