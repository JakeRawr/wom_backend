'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var userSchema = mongoose.Schema({
  name: 'String',
  basic: {
    email: 'String',
    password: 'String'
  },
  comments: []
});

userSchema.methods.addNewComment = function(comment, restaurant) {
  if (this.comments[0] === null){
    this.comments = [{restaurant: restaurant, comment: comment}];
  } else {
    this.comments.push({restaurant: restaurant, comment: comment});
  }
};

userSchema.methods.listComments = function (){
  return this.comments;
};

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function (secret) {
  var expires = moment().add(7, 'days').valueOf();
  var self = this;
  var token = jwt.encode({
    iss: self._id,
    expire: expires
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);

