'use strict';
// average rating object for particular restaurant + genre. 
var Genre = require('../models/genre');
var Rating = require('./rating');


module.exports = function(restaurant,genre,catAvgArray){
	this.restaurant = restaurant;
	this.catAvgArray = catAvgArray; //array holding averages for each category
	this.avgOverallScore = 0; 
	this.counts =  0; 
};


//find 
