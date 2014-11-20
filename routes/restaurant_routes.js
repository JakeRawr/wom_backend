
'use strict';
var Rating = require('../lib/rating');
var Average = require('../lib/averageRating');
var Restaurant = require('../models/restaurant');
var _ = require('lodash');


module.exports = function(app, nameValidate){

	//retruns all restaurants
	app.get('/list', function(req,res){
		Restaurant.find({},function(err,data){
		var list =  [];
		if(data) {
	      _.forEach(data, function (info) {
	        list.push(info.name);
	      });
  		}
    res.send({list:list});
		});
	});

	// returns list of comments from chosen restaurant given the name
	app.get('/comments/:restaurant',function(req,res){
		Restaurant.findOne({'name':req.params.restaurant}, function(err, rest){
		 	if (err) return res.status(500).send('server error: get comments');
		 	//if the restaurant exists, send all comments
			if (rest) return res.send(rest.commentsCollection[0]);
		});
	});

	//returns the genres of restaurant
	app.get('/genres/:restaurant', function(req,res) {
		Restaurant.findOne({'name':req.params.restaurant}, function(err, data){
		 	if (err) return res.status(500).send('server error: get comments');
		 	//if the restaurant exists, send all comments
		 	var list = [];
		 	_.forEach(data.commentsCollection, function (info) {
        list.push(info.genre);
      });
			res.send({list:list});
		});
	});

	//add a new restaurant to collection given the name
	app.post('/addRest', nameValidate,function(req,res){
		Restaurant.findOne({'name': req.body.restaurant}, function(err, rest){
		 	if (err) return res.status(500).send('server error: post new rest');
		 	//should res.send comments of existing restaurant.
			if (rest) return res.send(rest);

			var newRest = new Restaurant();
			newRest.name = req.body.restaurant;
			newRest.average.push(new Average(req.body.restaurant,req.body.genre));
			newRest.save(function (err) {
				if(err) return res.status(500).send('server error: post new rest');
				res.send(req.body.restaurant + " has been added");
			});
		});
	});


};

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDZhN2MyMTQwM2VkYTU4NDNmN2YwODIiLCJleHBpcmUiOjE0MTY4Njk1Mzc3NzR9.zC1uOtK_isDAjHcZW6nm-aARimTsKBKC-pInqZi2dPY
