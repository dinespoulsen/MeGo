
module.exports = function(app, passport) {

  app.post('/memories', (req, res) => {
    console.log("sent from memories router")
    console.log(req.body.title);
    console.log(req.body.location);
    console.log(req.body.description);
    console.log(req.body.imageUrl);
    return res.send(JSON.stringify({ success: true }));
  });

};
