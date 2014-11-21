'use strict';
//rating object
var Genre = require('../models/genre');
module.exports = function(user, str, genre, rest) {
  this.user = user;
  this.str = str;
  this.genre = genre;
  this.rest = rest;
  this.overallScore = 0;
};
