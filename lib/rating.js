'use strict';
//rating object

var Genre = require('../models/genreTemplate');

module.exports = function(user,rating,str,genre,rest){
	this.user = user;
	this.str = str; //body of comment
  this.genre = genre; //"genre" of food (burgers, pizza, etc.)
  this.rest = rest;
  var self = this;

  //returns the category rating template array 
  Genre.findOne({'name': genre}, function(err,gen){
  	self.catArray = gen.returnCats();
  })


};
