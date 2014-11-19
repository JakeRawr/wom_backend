'use strict';
//rating object

var Genre = require('../models/genre');

module.exports = function(user,str,genre,rest){
	this.user = user;
	this.str = str; //body of comment
  this.genre = genre; //"genre" of food (burgers, pizza, etc.)
  this.rest = rest;
  this.catArray = (function (){
                    Genre.findOne({'name': genre}, function(err,gen){
                      console.log("am i in here");
                      return gen.returnCats();
                    });
                  }());
                  //returns the category rating template array

};
