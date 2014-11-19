'use strict';

var Category = require('../models/category');

module.exports = function(){
	return function(req,res,next){
		Category.findOne({'name' :req.body.category},function(err,rest){
			if(rest!==null) {
				rest.addRest(req.body.restaurant);
				rest.name = req.body.category; 
			}else{
				var cat = new Category();
				cat.name = req.body.category;
				cat.addRest(req.body.restaurant);
			}
			rest.save(function(err){
				if(err) console.log("cannot save");
				next();
			});
		});
	};
};