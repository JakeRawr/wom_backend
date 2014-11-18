'use strict';
var bodyparser = require('body-parser');

var User = require('../models/user');
var validator = require("email-validator");

module.exports = function (app, passport) {
  app.use(bodyparser.json());
  app.get('/api/users', passport.authenticate('basic', {session: false}), function (req,res) {
    res.json({'jwt':req.user.generateToken(app.get('jwtSecret'))});
  });

  //generate new user
  app.post('/api/users', function (req, res) {
    if (!validator.validate(req.body.email)) return res.send('Please enter a valid email');



    //check if email exists or if username exists
    User.findOne({ $or:[ {'basic.email': req.body.email}, {'name': req.body.name}]}, function (err, user) {
      if (err) return res.status(500).send('server error');
      if (user) {
        if (user.basic.email === req.body.email) return res.send('email already existed');
        else return res.send('username taken');
      }

      //check if the password confirmation is match
      if(req.body.password !== req.body.passwordConfirm) return res.send('passwords did not match');
      var newUser = new User();
      newUser.name = req.body.name;
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.save (function (err) {
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
  });
};



