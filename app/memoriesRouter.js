
module.exports = function(app, passport) {

  app.post('/memories', isLoggedIn, (req, res) => {
    console.log(req.user);
    console.log("sent from memories router")
    console.log(req.body.title);
    console.log(req.body.location);
    console.log(req.body.description);
    console.log(req.body.imageUrl);
    return res.send(JSON.stringify({ success: true, userId: req.user._id }));
  });

};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
}
