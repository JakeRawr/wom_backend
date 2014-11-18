'use strict';
var mongoose = require('mongoose');
var Comment = require('../lib/comment');

var restaurantSchema = mongoose.Schema({
	name : 'String',
	commentsCollection: []
										//object of objects pertaining to specific food categories (burgers, pizza, etc.)
										// each object stores all comments for that category
});


restaurantSchema.methods.addNewComment = function(comment){
	//if the comment category does not exist, add new object for that category to commentsCollection
	if(!this.commentsCollection[0]) {
		this.commentsCollection = [{category: comment.category,
																	comment: [comment.str]}];
	}
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
