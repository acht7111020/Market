var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  if (req.user)
    res.render('index', { title: 'Ballon', user:req.user.email});
  else {
    res.render('index', { title: 'Ballon', user: 'no logged in'});
  }
});

module.exports = router;

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   return next();
// }
