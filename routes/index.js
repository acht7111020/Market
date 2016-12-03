var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user-schema');
var Store = require('../models/store-schema');
var expressHbs = require('express-handlebars');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user){
    User.find(function(err, docs) {
      var index = docs.map(function(item) {
        return item.username;
      }).indexOf(req.user.username);
      docs.splice(index, 1);
      var findQuery = Store.find();
      findQuery.sort('position').exec(function(storeErr, storeDocs){
        if(storeErr) throw storeErr;
        console.log(storeDocs);
        res.render('index', {
          username: req.user.username,
          useremail: req.user.email,
          friends: docs,
          title: "Ballon store",
          stores: storeDocs
        });
      });
    });
  }
  else {
    res.render('index', {title: "Ballon_unlog"});
  }
});
/*
expressHbs.registerHelper('ifIsTrue', function(value, options) {
  if(value.available === true) {
    return true;
  }
  return false;
});*/

module.exports = router;
