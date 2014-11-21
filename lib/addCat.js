'use strict';
//middleware to add the restaurant to the genre's model
var Genre = require('../models/genre');
module.exports = function() {
  return function(req, res, next) {
    Genre.findOne({ name: req.body.genre }, function(err, genre) {
      if (genre !== null) {
        genre.addRest(req.body.restaurant);
        genre.save(function(err) {
          if (err)
            console.log('cannot save');
        });
      } else {
        var cat = new Genre();
        cat.name = req.body.genre;
        cat.addRest(req.body.restaurant);
        cat.save(function(err) {
          if (err)
            console.log('cannot save');
        });
      }
    });
    next();
  };
};
