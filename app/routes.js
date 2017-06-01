import path from 'path';
module.exports = function(app, passport) {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('./', 'index.html'));
  });

  app.get('/loginpage', (req, res) => {
    res.sendFile(path.resolve('./', 'index.html'));
  });

  app.get('/logout', (req, res) => {
      if(req.user){
      }
      req.logout();
      res.redirect('/');
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

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
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

    app.get('/profile', isLoggedIn, function(req, res) {
        res.send('you are logged in');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
