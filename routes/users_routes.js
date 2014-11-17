'use strict';
var bodyparser = require('body-parser');

var User = require('../models/user');

module.exports = function (app, passport) {
  app.use(bodyparser.json());
  app.get('/api/users', passport.authenticate('basic', {session: false}), function (req,res) {
    res.json({'jwt':req.user.generateToken(app.get('jwtSecret'))});
  });

  //generate new user
  app.post('/api/users', function (req, res) {
    User.findOne({'basic.email': req.body.email}, function (err, user) {
      if (err) return res.status(500).send('server error');
      if (user) return res.send('cannot create that user');

      //check if the password confirmation is match
      if(req.body.password !== req.body.passwordConfirm) return res.send('passwords did not match');
      var newUser = new User();
      newUser.name = req.body.name;
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.save (function (err, data) {
        if (err) return res.status(500).send('server error');
        res.send({'jwt': newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });

  //returns collection of users
  app.get('/test',function(req,res){
  User.find({},function(err,data){
    res.send(data);
    });
  })
};



//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDZhNDg1YTA3Y2IxMTE1MWZmNWMzY2YiLCJleHBpcmUiOjE0MTY4NTYyODMxMDF9.kJoml66BzRrXAZR65DDz7pUyJmNX5wNo8RWEbQCKTd8
