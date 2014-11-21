'use strict';
//user model
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
//add a rating to the user's rating model
userSchema.methods.addNewRating = function(rating) {
  this.ratingObjects.push(rating);
};
//returns the list of rating objects for this user
userSchema.methods.listRatingObjects = function() {
  return this.ratingObjects;
};
//following three methods are those related to auth-auth
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};
userSchema.methods.generateToken = function(secret) {
  var _this = this;
  var token = jwt.encode({ iss: _this._id }, secret);
  return token;
};
module.exports = mongoose.model('User', userSchema);
