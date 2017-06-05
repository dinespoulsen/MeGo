import path from 'path';
import express from'express';

module.exports = function(app, passport) {

  app.get('/', (req, res) => {
    res.render('index', { message: req.flash('signupMessage') });
  });

  app.get('/login', (req, res) => {
    res.render('index', { message: req.flash('loginMessage') });
  });

  app.get('/signup', (req, res) => {
    res.render('index', { message: req.flash('signupMessage') });
  });

  app.get('/logout', (req, res) => {
      if(req.user){
      }
      req.logout();
      res.redirect('/login');
  });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }

      if(!user) {
        return res.send({ success : false, message : info });
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
        return res.send({ success : false, message : info });
      }

      req.login(user, loginErr => {
        if(loginErr) {
          return next(loginErr);
        }
          return res.send(JSON.stringify({ success : true, message : info}));
      });
    })(req, res, next);
  });

    app.get('*', isLoggedIn, function(req, res) {
      res.render('index');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
}
