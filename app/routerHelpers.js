export function isLoggedInUser(req, res, next) {

  if(req.isAuthenticated()) {
    if(req.user.id === req.params.id) {
      return next();
    }
    else {
      res.render('index');
    }
  }
  else {
    res.redirect('/login');
  }
}

export function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
}
