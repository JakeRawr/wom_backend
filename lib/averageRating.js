'use strict';
// average rating object for particular restaurant + genre.
module.exports = function(restaurant, genre, catAvgArray) {
  this.restaurant = restaurant;
  this.genre = genre;
  this.catAvgArray = catAvgArray;
  this.avgOverallScore = 0;
  this.counts = 0;
};
