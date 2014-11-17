//!!!!!!!!!!!!!!!!!DO NOT NEEED !!!!!!!!!!!!!!!!


var Comment = require('comment')

module.exports = function(name,rating,comment,category) {
	this.name = name;
	this.category = category
	this.avgRating = rating;
	this.commentsArray = [];

	this.constructor.prototype.newComment = function(user,rating,str) {
		var com = new Comment(user,rating,str);
		var newRateSum = ((this.avgRating * this.commentsArray.length) + rating)
		this.comments.push(com);
		this.avgRating = newRateSum/this.commentsArray.length;


	}
}