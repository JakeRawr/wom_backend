var validator = require('validator')
//middleware that takes user input from the request and strips illegal characters
//and stores everything as lowercase
module.exports = function(){
	return function (req,res,next){
		validator.trim(req.body.)

		next();
	}
}