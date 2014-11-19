'use strict';
//template for categories of  each of the genres.
var mongoose = require('mongoose');

var genre = mongoose.Schema({
	name : 'String',
	cats: [], // what categories should be stored according to each genre
  restList: []
});

//catRating = 'String'
genre.methods.add = function(catRating){
	this.cats.push(catRating);
};

genre.methods.returnCats = function(){
	return this.cats;
};

//rest = 'String'
genre.methods.addRest = function (rest) {
  for (var i = 0; i < this.restList.length; i++) {
    if(this.restList[i] == rest) {
      return;
    }
  }
  this.restList.push(rest);
};


module.exports = mongoose.model("Genre",genre);
