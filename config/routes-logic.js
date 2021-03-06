function RoutesLogic (req, res, next) {
  if (req.isAuthenticated()) {
    if (!req.session.level) {
      req.session.level = 1;
    }
    req.renderValues = {
      title: "GoodGoods",
      fb_user: req.user.facebook,
      userId: req.user._id
    }
    return next();
  }
  else if(req.path == '/') {
    res.render('index', {title: "GoodGoods"});
  }
  else {
    res.redirect('/');
  }
}

module.exports = RoutesLogic;
