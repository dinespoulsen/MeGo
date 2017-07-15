import User from '../models/user';
import Goal from '../models/goal';
import Memory from '../models/memory';
import s3 from '../config/s3.js';
import { Map, List } from 'immutable';
import { isLoggedIn, isLoggedInUser } from "./routerHelpers.js";
import { populateUserWithMemories, addSignedAvatarUrl } from "../src/helpers/modelExtensions.js";
module.exports = function(app, passport) {

  app.get('/getuserdata', function(req, res) {
    User.findOne({ '_id' :  req.user._id }, function(err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          return res.send(JSON.stringify({ success: false}));
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

  });

  app.put('/users/:id', isLoggedInUser, function(req, res, next) {
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

  app.get('/users/:id', isLoggedInUser, function(req, res, next) {
    res.render('index');
  });

};
