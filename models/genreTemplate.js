'use strict';
//template for categories of  each of the genres.
var mongoose = require('mongoose');

var categoryRatingSchema = mongoose.Schema({
	name : 'String',
	cats: [] // what categories should be stored according to each genre
})


categoryRatingSchema.methods.add = function(catRating){
	this.cats.push(catRating);
}

categoryRatingSchema.methods.returnCats = function(){
	return this.cats;
}


module.exports = mongoose.model("Genre",categoryRatingSchema);