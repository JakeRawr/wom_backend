
'use strict';
var Comment = require('../lib/comment');
var Restaurant = require('../models/restaurant');


module.exports = function(app, nameValidate){

	//retruns all restaurants
	app.get('/test/list', function(req,res){
		Restaurant.find({},function(err,data){
    res.send(data);
		});
	});


	// returns list of comments from chosen restaurant given the name
	app.get('/comments/:name',function(req,res){
		Restaurant.findOne({'name':req.params.name}, function(err, rest){
		 	if (err) return res.status(500).send('server error: get comments');
		 	//if the restaurant exists, send all comments
			if (rest) return res.send(rest.commentsCollection);
		});
	});

	//add a new restaurant to collection given the name
	app.post('/addRest', nameValidate,function(req,res){
		var str = req.body.restaurant;
		var nstr = str.replace(/\s+/g, '-');
		var regex = nstr.replace(/[\|&;\$%@"<>\(\)\+,\/!\']/g, "").toLowerCase();
		Restaurant.findOne({'name': regex}, function(err, rest){
		 	if (err) return res.status(500).send('server error: post new rest');
		 	//should res.send comments of existing restaurant.
			if (rest) return res.send(rest);
			var newRest = new Restaurant();
			newRest.name = regex;
			newRest.save(function (err) {
				if(err) return res.status(500).send('server error: post new rest');
				res.send(regex + " has been added");
			});
		});
	});


};

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDZhN2MyMTQwM2VkYTU4NDNmN2YwODIiLCJleHBpcmUiOjE0MTY4Njk1Mzc3NzR9.zC1uOtK_isDAjHcZW6nm-aARimTsKBKC-pInqZi2dPY
