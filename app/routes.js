import path from 'path';
import express from'express';
import s3 from '../config/s3.js'
import  fs from "fs";
import User from '../models/user';

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
        return res.send({ success: false, message: info });
      }

      req.login(user, loginErr => {
        if(loginErr) {
          return next(loginErr);
        }
        return res.send(JSON.stringify({ success: true, message: info, user: user }));
      });
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }

      if(!user) {
        return res.send({ success: false, message: info });
      }

      req.login(user, loginErr => {
        if(loginErr) {
          return next(loginErr);
        }
          return res.send(JSON.stringify({ success: true, message: info, user: user }));
      });
    })(req, res, next);
  });

  app.post('/s3signedurl', isLoggedIn, (req, res) => {
    let params = {Bucket: req.body.bucket, Key: req.body.key, ResponseCacheControl: "max-age=1000"};
    let url = s3.getSignedUrl('getObject', params);
    return res.send(JSON.stringify({ signedUrl: url}));
  });

  app.post('/s3upload', isLoggedIn, function(req, res) {
    User.findOne({ '_id' :  req.user._id }, function(err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          return res.send(JSON.stringify({ success: false}));
        }

        let imageDataUrl = req.body.dataUrl;
        let regex = /^data:.+\/(.+);base64,(.*)$/;
        let matches = imageDataUrl.match(regex);
        let ext = matches[1];
        let data = matches[2];
        let buffer = new Buffer(data, 'base64');

        user.local.avatarFileName = req.body.fileName + "." + ext;

        user.save(function(err) {
            if (err) {
              throw err;
            }

            s3.putObject({
              ACL: 'public-read',
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: req.body.fileName + "." + ext,
              Body: buffer,
              ContentType: 'image/' + ext,
              CacheControl: "max-age=1000"
            }, function(error, response) {
              if(error){
                throw err;
              }
              return res.send(JSON.stringify({ success: true}));
            });
        });
    });


  });

  app.post('/getuserdata', isLoggedIn, function(req, res) {
    return res.send(JSON.stringify({ success: true, user: req.user }));
  });

  app.put('/users/:id', function(req, res, next) {
    passport.authenticate('local-update-user', function(err, user, info) {
      if (err) {
        return next(err);
      }

      if(!user) {
        return res.send({ success: false, message: info });
      }

      req.login(user, loginErr => {
        if(loginErr) {
          return next(loginErr);
        }
          return res.send(JSON.stringify({ success: true, message: info, userId: user.id }));
      });
    })(req, res, next);
  });

  app.get('/users/:id', function(req, res, next) {
    if(req.user) {
      if(req.user.id === req.params.id) {
        res.render('index');
      }
      else {
        res.redirect('/login');
      }
    }
    else {
      res.redirect('/login');
    }
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
