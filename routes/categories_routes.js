'use strict';

var Category = require('../models/category');

module.exports = function(app){

	app.get('/list',function(req,res){
		Category.find({},function(err,data){
   	 res.send({'name': data.name, 'list': data.list});
    });
	});
};


