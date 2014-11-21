'use strict';
//middleware to verify users
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');
module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    User.findOne({ 'basic.email': email }, function(err, user) {
      console.log('email: '+ email, ' password: ' + password);
      console.log('email: '+ basic.email, ' password: ' + basic.password);
      console.log('email: '+ basic.email, ' password: ' + password);
      if (err)
        return done('server error');
      if (!user)
        return done('access error');
      if (!user.validPassword(password))
        return done('access error');
      return done(null, user);
    });
  }));
};
