'use strict';

var Category = require('../models/category');

module.exports = function(){
	return function(req,res,next){
		Category.findOne({'name' :req.body.category},function(err,rest){
			rest.addRest(req.body.restaurant);
			next();
		});
	};
};