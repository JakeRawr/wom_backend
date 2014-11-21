'use strict';
//middleware for rating object. sets the req.newRate property
//to a new rating object with the user's input.
var Rating = require('../lib/rating');
var Genre = require('../models/genre');
module.exports = function() {
  return function(req, res, next) {
    var newRate = new Rating(req.user.name, req.body.str, req.body.genre, req.body.restaurant);
    var sum = 0;
    for (var i = 0; i < req.body.rating.length; i++) {
      sum += req.body.rating[i];
    }
    newRate.overallScore = sum / req.body.rating.length;
    Genre.findOne({ name: req.body.genre }, function(err, gen) {
      newRate.catsArray = gen.returnCats();
      req.newRate = newRate;
      next();
    });
  };
};
