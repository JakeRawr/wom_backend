'use strict';

var Category = require('../models/category');

module.exports = function(){
	return function(req,res,next){
		Category.findOne({'name' :req.body.category},function(err,category){
			if(category!==null) {
				category.addRest(req.body.restaurant);
				category.save(function(err){
					if(err) console.log("cannot save");
				});
			}else{
				var cat = new Category();
				cat.name = req.body.category;
				cat.addRest(req.body.restaurant);
				cat.save(function(err){
					if(err) console.log("cannot save");
				});
			}
		});
		next();
	};
};
