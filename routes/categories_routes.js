'use strict';

var Category = require('../models/category');

module.exports = function(app){

	app.get('/list',function(req,res){
		Category.find({},function(err,data){
		res.send(data);
   	// res.send({'name': data.name, 'list': data.list});
    });
	});

	app.post('/add',function(req,res){
		var cat = new Category();
		cat.name = req.body.category;
		cat.save(function(err,data){
			res.send(data);
		})

	})
};



