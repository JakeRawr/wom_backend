'use strict';
//middleware to find the genre model of the request body
var Genre = require('../models/genre');
module.exports = function() {
  return function(req, res, next) {
    Genre.findOne({ name: req.params.genre }, function(err, gen) {
      req.genreCats = gen.returnCats();
      next();
    });
  };
};
