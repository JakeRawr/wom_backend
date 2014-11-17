'use strict';
var Comment = require('../lib/comment');
var Restaurant = require('../models/restaurant');


module.exports = function(app){

	app.get('/api/rest', function(req,res){
		Restaurant.find({},function(err,data){
    res.send(data);
		});
	});

	//Takes
	app.post('/api/rest',function(req,res){
		Restaurant.findOne({'name':req.body.name}, function(err, rest){
		 	if (err) return res.status(500).send('server error');
		 	//if the restaurant exists
			if (rest){
			 		res.send(rest.name);
			}else{
		 		var newRest = new Restaurant();
		 		newRest.name = req.body.name;
		 		newRest.save(function (err,data) {
		 			if (err) return res.status(500).send('server error');
		 			res.send(newRest.commentsCollection);
		 		});
			}
		});
	});

	app.post('/api/rest',function(req,res){
		//Restaurant.
	});
};
