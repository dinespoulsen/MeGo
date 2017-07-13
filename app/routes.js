import path from 'path';
import express from'express';
import s3 from '../config/s3.js';
import User from '../models/user';
import Goal from '../models/goal';
import Memory from '../models/memory';
import { Map, List } from 'immutable';
import { populateUserWithMemories, addSignedAvatarUrl } from "../src/helpers/modelExtensions.js";
import { isLoggedIn, isLoggedInUser } from "./routerHelpers.js";

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

      let updatedUser;
      if(user.local.avatarFileName) {
        updatedUser = addSignedAvatarUrl(s3, user);
      }

      let populateUserWithGoals = new Promise((resolve, reject) => {
        Goal.find({ _user: updatedUser.get("_id") }).
        exec((err, goals) => {
            if (err) return handleError(err);

            resolve(updatedUser.set("goalObjects", List(goals)));
        });
      })

      populateUserWithGoals.then(userWithGoals => {
        populateUserWithMemories(Memory, s3, userWithGoals, process.env.AWS_S3_BUCKET_NAME, res);
      })

      });
    })(req, res, next);
  });

  app.post('/s3signedurl', isLoggedIn, (req, res) => {
    let params = {Bucket: req.body.bucket, Key: req.body.key};
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
              ContentType: 'image/' + ext
            }, function(error, response) {
              if(error){
                throw err;
              }
              return res.send(JSON.stringify({ success: true}));
            });
        });
    });


  });

  app.get('*', isLoggedIn, function(req, res) {
    res.render('index');
  });
};
