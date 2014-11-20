'use strict';
//template for categories of  each of the genres.
var mongoose = require('mongoose');
var genre = mongoose.Schema({
  name: 'String',
  cats: [],
  restList: []
});
//catRating = 'String' for us to add 5 criteria for rating
genre.methods.add = function (catRating) {
  this.cats.push(catRating);
};
//returns the categories list of this genre
genre.methods.returnCats = function () {
  return this.cats;
};
//adds a restaurant to the list of this genre
genre.methods.addRest = function (rest) {
  for (var i = 0; i < this.restList.length; i++) {
    if (this.restList[i] == rest) {
      return;
    }
  }
  this.restList.push(rest);
};
module.exports = mongoose.model('Genre', genre);