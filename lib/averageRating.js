'use strict';
// average rating object for particular restaurant + genre. 
var Genre = require('../models/genre');
var Rating = require('./rating');


module.exports = function(restaurant,genre){
	this.restaurant = restaurant;
	this.catAvgArray = []; //array holding averages for each category
	this.avgOverallScore = 0; 
/*
	this.constructor.prototype.newOverallAvg = function(rating,totalLength){
		this.avgOverallScore * totalLength = (rating.overallScore + this.avgOverallScore)/(totalLength+1);
	};

	this.constructor.prototype.newCatAvgs = function(rating){
		var rateArray = rating;
	}
	*/
};



