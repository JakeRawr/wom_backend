var mongoose = require('mongoose');
var Comment = require('../lib/comment')

var restaurantSchema = mongoose.Schema({
	name : 'String',
	commentsCollection : {}//object of objects pertaining to specific food categories (burgers, pizza, etc.)
										// each object stores all comments for that category
});


restaurantSchema.methods.addNewComment = function(comment){
	//if the comment category does not exist, add new object for that category to commentsCollection
	if(!this.commentsCollection.hasOwnProperty(comment.category)){
		var newCategory = {'name': comment.category, 'comments':[comment.str]}
		this.commentsCollection[comment.category] = [comment.str];
	}else{
		//adds comment body to the appropriate comment category
		this.commentsCollection[comment.category].push(comment.str);
	}
}

module.exports = mongoose.model('Restaurant', restaurantSchema);