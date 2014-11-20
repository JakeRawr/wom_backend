'use strict';
var mongoose = require('mongoose');
var Rating = require('../lib/rating');
var Avg = require('../lib/averageRating');
var restaurantSchema = mongoose.Schema({
  name: 'String',
  commentsCollection: [{
      genre: 'String',
      ratings: [],
      avg: []
    }]
});
restaurantSchema.methods.addRating = function (rating, newRatingArray) {
  //if the comment category does not exist, add new object for that category to commentsCollection
  //and create a new average as the new ratings numbers
  for (var i = 0; i < this.commentsCollection.length; i++) {
    if (this.commentsCollection[i].genre == rating.genre) {
      this.commentsCollection[i].ratings.push(rating);
      var oldAvg = this.commentsCollection[i].avg[0];
      //sort through old/new cat array while updating the avg
      for (var j = 0; j < oldAvg.catAvgArray.length; j++) {
        oldAvg.catAvgArray[j] = (oldAvg.catAvgArray[j] * oldAvg.counts + newRatingArray[j]) / (oldAvg.counts + 1);
      }
      oldAvg.avgOverallScore = (oldAvg.avgOverallScore * oldAvg.counts + rating.overallScore) / (oldAvg.counts + 1);
      oldAvg.counts++;
      this.commentsCollection[i].avg.pop();
      this.commentsCollection[i].avg.push(oldAvg);
      return;
    }
  }
  var newAvg = new Avg(this.name, rating.genre, newRatingArray);
  newAvg.counts++;
  newAvg.avgOverallScore = rating.overallScore;
  this.commentsCollection.push({
    genre: rating.genre,
    ratings: [rating],
    avg: [newAvg]
  });
};
module.exports = mongoose.model('Restaurant', restaurantSchema);