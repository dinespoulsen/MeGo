import User from '../models/user';
import Memory from '../models/memory';
import { Map } from 'immutable';

module.exports = function(app, passport) {

  app.get('/time', isLoggedIn, (req, res) => {
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

        populateUserWithMemories(Memory, s3, updatedUser, process.env.AWS_S3_BUCKET_NAME, res);
    });
  });

};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
}
