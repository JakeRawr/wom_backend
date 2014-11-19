'use strict';
//rating object

var Genre = require('../models/genre');

module.exports = function(user,str,genre,rest){
	this.user = user;
	this.str = str; //body of comment
  this.genre = genre; //"genre" of food (burgers, pizza, etc.)
  this.rest = rest;
  this.catArray = [];
  var self = this;

  //returns the category rating template array
  Genre.findOne({'name': genre}, function(err,gen){
  	self.catArray = gen.returnCats();
  });


};
