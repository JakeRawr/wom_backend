'use strict';
var mongoose = require('mongoose');
var Rating = require('../lib/rating');
var Avg = require('../lib/averageRating');

var restaurantSchema = mongoose.Schema({
	name : 'String',
	commentsCollection: [{genre: 'String', ratings: [], avg: []}],
});


restaurantSchema.methods.addRating = function(rating){
	//if the comment category does not exist, add new object for that category to commentsCollection
  for (var i = 0; i < this.commentsCollection.length; i++){
    if(this.commentsCollection[i].genre == rating.genre) {
      (this.commentsCollection[i].ratings).push(rating);
      return;
    }
  }
  this.commentsCollection.push({genre: rating.genre, ratings: [rating]});
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
