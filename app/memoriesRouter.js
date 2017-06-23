import User from '../models/user';
import Memory from '../models/memory';
import s3 from '../config/s3.js'
import { uploadImage } from "../src/helpers/modelExtensions.js"

module.exports = function(app, passport) {

  app.post('/memories', isLoggedIn, (req, res) => {
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

        let memory = new Memory({
          title: req.body.title,
          location: req.body.location,
          description: req.body.description,
          filename: req.body.title + "." + ext,
          _user: req.user._id
        });

        memory.save(function (err) {
          if (err) return handleError(err);
          // thats it!
        });

        user.local.memories.push(memory);
        user.save(function (err) {
          if (err) return handleError(err);

          uploadImage(s3, req.body.title, ext, buffer, res)
        });

      });

    });


};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
}
