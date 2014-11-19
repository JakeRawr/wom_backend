'use strict';

var mongoose = require('mongoose');

var categoryRatingSchema = mongoose.Schema({
	name : 'String',
	cats: []
})


categoryRatingSchema.methods.add = function(catRating){
	cats.push(catRating);
}


