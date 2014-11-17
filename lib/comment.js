module.exports = function(user,rating,str,category){
	this.category = category; //"type" of food (burgers, pizza, etc.)
	this.user = user;
	this.rating = rating; //thumbs up thumbs down???
	this.str = str; //body of comment
}