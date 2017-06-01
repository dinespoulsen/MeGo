import path from 'path';
module.exports = function(app, passport) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'index.html'));
  });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }

      if(!user) {
        return res.send({ success : false, message : 'authentication failed' });
      }

      req.login(user, loginErr => {
        if(loginErr) {
          return next(loginErr);
        }
        return res.send(JSON.stringify({ success : true, message : 'authentication succeeded'}));
      });
    })(req, res, next);
  });

    // app.get('/login', function(req, res) {
    //
    //     res.render('login.ejs', { message: req.flash('loginMessage') });
    // });
    //
    // app.get('/signup', function(req, res) {
    //
    //     res.render('signup.ejs', { message: req.flash('signupMessage') });
    // });
    //
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     res.render('profile.ejs', {
    //         user : req.user
    //     });
    // });
    //
    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
