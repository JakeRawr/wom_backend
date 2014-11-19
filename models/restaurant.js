'use strict';
var mongoose = require('mongoose');
var Comment = require('../lib/comment');

var restaurantSchema = mongoose.Schema({
	name : 'String',
	commentsCollection: [{category: 'String', comments: []}]
										//object of objects pertaining to specific food categories (burgers, pizza, etc.)
										// each object stores all comments for that category
});


restaurantSchema.methods.addNewComment = function(comments){
	//if the comment category does not exist, add new object for that category to commentsCollection
  for (var i = 0; i < this.commentsCollection.length; i++){
    if(this.commentsCollection[i].category == comments.category) {
      (this.commentsCollection[i].comments).push(comments.str);
      return;
    }
  }
  this.commentsCollection.push({category: comments.category, comments: [comments.str]});
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
