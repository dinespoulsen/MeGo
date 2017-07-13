import User from '../models/user';
import Goal from '../models/goal';
import s3 from '../config/s3.js';
import { isLoggedIn } from "./routerHelpers.js";

module.exports = function(app, passport) {

  app.post('/goals', isLoggedIn, (req, res) => {
    User.findOne({ '_id' :  req.user._id }, function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        return res.send(JSON.stringify({ success: false}));
      }

      let goal = new Goal({
        title: req.body.title,
        achieved: false,
        description: req.body.description,
        _user: req.user._id
      });

      goal.save(function (err) {
        if (err) return handleError(err);
      });

      user.local.goals.push(goal);
      user.save(function (err) {
        if (err) return handleError(err);

        return res.send(JSON.stringify({ success: true, goal: goal }));
      });
    });
  });

  app.put('/goals/:id', function(req, res, next) {
    Goal.findOne({ '_id' :  req.body.id }, function(err, goal) {
      if (err) {
        throw err;
      }
      if (!goal) {
        return res.send(JSON.stringify({ success: false}));
      }

      if(String(goal._user) !== String(req.user._id) ){
        return res.send(JSON.stringify({ success: false}));
      }

      goal.achieved = req.body.achieved;
      goal.save(function (err) {
        if (err) return handleError(err);
        return res.send(JSON.stringify({ success: true}));
      });

    });

  });

};
