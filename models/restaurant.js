'use strict';
var mongoose = require('mongoose');
var Rating = require('../lib/rating');
var Avg = require('../lib/averageRating');

var restaurantSchema = mongoose.Schema({
	name : 'String',
	commentsCollection: [{genre: 'String', ratings: [], avg: []}],
});

//also sets avg to the rating if first genre
restaurantSchema.methods.addRating = function(rating){
	//if the comment category does not exist, add new object for that category to commentsCollection
  //and create a new average as the new ratings numbers
  for (var i = 0; i < this.commentsCollection.length; i++){
    if(this.commentsCollection[i].genre == rating.genre) {
      (this.commentsCollection[i].ratings).push(rating);
      var oldAvg = this.commentsCollection[i].avg[0];
      if(oldAvg === undefined){
         var newsAvg = new Avg(this.name,rating.genre,rating.catsArray);
        newsAvg.counts++;
        this.commentsCollection.push({genre: rating.genre, ratings: [rating], avg: [newsAvg]});
        return;
      }
      console.log("The old average is this oneeee " + oldAvg);
      //sort through old/new cat array while updating the avg
      for(var j = 0; j< oldAvg.catAvgArray.length; i++){
        oldAvg.catAvgArray[i] = ((oldAvg.catAvgArray[i]*oldAvg.count) + rating.catsArray[i])/(oldAvg.count+1);
      }
      oldAvg.avgOverallScore = ((oldAvg.avgOverallScore*oldAvg.count) + rating.overallScore)/(oldAvg.count+1);
      oldAvg.count++;
      return;
    }
  }
  var newAvg = new Avg(this.name,rating.genre,rating.catsArray);
  newAvg.counts++;
  this.commentsCollection.push({genre: rating.genre, ratings: [rating], avg: newAvg});
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
