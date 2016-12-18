function RoutesLogic (req, res, next) {
  console.log(req.path);
  if (req.isAuthenticated()) {
    if (!req.session.level) {
      req.session.level = 'G';
    }
    req.renderValues = {
      title: "Ballon",
      fb_user: req.user.facebook
    }
    return next();
  }
  else if(req.path == '/') {
    res.render('index', {title: "Ballon"});
  }
  else {
    res.redirect('/');
  }
}

module.exports = RoutesLogic;
