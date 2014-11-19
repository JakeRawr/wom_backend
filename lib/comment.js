/////////////////DEEEPRECCCIAATTEEDDD ?!?!!?! ////////////////
'use strict';
var Restaurant = require('../models/restaurant');

module.exports = function(user,rest,genre,rateCats,commentBody){
	this.user = user;
	this.rest = rest;
	this.commentBody = commentBody;
	this.genre = genre;
	//want rating categories based on genre of food. (i.e, pizza would have its own rating categories)

}