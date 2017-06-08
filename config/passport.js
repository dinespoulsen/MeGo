import passportLocal from 'passport-local';
import User from '../models/user';

let LocalStrategy = passportLocal.Strategy;

export default function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
      process.nextTick(function() {
      User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err)
              return done(err);

          if (user) {
              return done(null, false, 'That email is already taken.');
          } else {
              var newUser = new User();
              newUser.local.email    = email;
              newUser.local.password = newUser.generateHash(password);

              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
          }

      });

      });

  }));

  passport.use('local-update-user', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'name',
      passReqToCallback : true
  },
  function(req, email, name, done) {
      User.findOne({ '_id' :  req.user._id }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, "The email does not exist.");
          }

          if (req.user._id != req.params.id){
            return done(null, false, "You can't access that user");
          }

          user.local.email = email;
          user.local.name = name;
          user.save(function(err) {
              if (err)
                  throw err;
              return done(null, user);
          });
      });

  }));

  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
      User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, {email: "The email does not exist."});
          }

          if (!user.validPassword(password)) {
            return done(null, false, {password: 'Oops! Wrong password.'});
          }

          return done(null, user);
      });

  }));


};
