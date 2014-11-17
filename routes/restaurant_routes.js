'use strict';
var Comment = require('../lib/comment');
var Restaurant = require('../models/restaurant');


module.exports = function(app){

	//retruns all restaurants
	app.get('/test/list', function(req,res){
		Restaurant.find({},function(err,data){
    res.send(data);
		});
	});

	// returns list of comments from chosen restaurant given the name
	app.get('/comments',function(req,res){
		Restaurant.findOne({'name':req.body.name}, function(err, rest){
		 	if (err) return res.status(500).send('server error: get comments');
		 	//if the restaurant exists, send all comments
			if (rest) res.send(rest.commentsCollection);
		});
	});

	//add a new restaurant to collection given the name
	app.post('/addComment',function(req,res){
		Restaurant.findOne({'name':req.body.name}, function(err, rest){
		 	if (err) return res.status(500).send('server error: post new rest');
			if (rest) return res.send(req.body.name + ' already exists');
			var newRest = new Restaurant();
			newRest.name = req.body.name;
			newRest.save(function (err,data) {
				if(err) return res.status(500).send('server error: post new rest');
				res.send(newRest);
			});
		});
	});


};

