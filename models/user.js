'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var userSchema = mongoose.Schema({
  name: 'String',
  basic: {
    email: 'String',
    password: 'String'
  },
  ratingObjects: []
});

userSchema.methods.addNewRating = function(rating) {
  this.ratingObjects.push(rating);
};

userSchema.methods.listRatingObjects = function (){
  return this.ratingObjects;
};

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function (secret) {
  var self = this;
  var token = jwt.encode({
    iss: self._id
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);

