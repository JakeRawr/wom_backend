'use strict';

module.exports = function(){
	return function(req,res,next){
		var str = req.body.restaurant;
    var nstr = str.replace(/\s+/g, '-');
    var regex = nstr.replace(/[\|&;\$%@"<>\(\)\+,\/!\'*\'+]/g, "").toLowerCase();
    req.body.restaurant = regex;
    next();
	};
};
