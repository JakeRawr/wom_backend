var mongoose = require('mongoose');
var Comment = require('../lib/comment')

var restaurantSchema = mongoose.Schema({
	name : 'String',
	commentsCollection : []//object of objects pertaining to specific food categories (burgers, pizza, etc.)
										// each object stores all comments for that category
});


restaurantSchema.methods.addNewComment = function(comment){
	if(this.commentsCollection[0] === undefined){
		this.commentsCollection[0] = {'category': comment.category, };
		//console.log(this.commentsCollection[0]);
	}

	//if the comment category does not exist, add new object for that category to commentsCollection
	if(!this.commentsCollection[0].hasOwnProperty(comment.category)){
		console.log('entered')
		this.commentsCollection[comment.category] = [5];

		console.log(comment.category + " is " + this.commentsCollection[comment.category])
	}else{
		console.log('a;ready there')
		//adds comment body to the appropriate comment category
		//this.commentsCollection[comment.category].push(comment.str);
	}
}

module.exports = mongoose.model('Restaurant', restaurantSchema);