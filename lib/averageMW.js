'use strict';
//middleware to access the average rating object each time a comment
//is added in order to update.
var Average = require('../lib/averageRating.js');
module.exports = function () {
  return function (req, res, next) {
    var array = req.body.rating;
    var sum = 0;
    for (var i = 0; i < req.body.rating.length; i++) {
      sum += req.body.rating[i];
    }
    var overall = sum / req.body.length;
  };
};