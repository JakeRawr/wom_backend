'use strict';

var Rating = require('../lib/rating');
var Genre = require('../models/genre');

module.exports = function(){
  return function(req,res,next){
    var newRate = new Rating(req.user.name, req.body.str, req.body.genre, req.body.restaurant);

    Genre.findOne({'name': req.body.genre}, function(err,gen){
      newRate.catsArray = gen.returnCats();
      req.newRate = newRate;
      next();
    });
  };
};
