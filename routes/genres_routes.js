'use strict';
//genres of food (pizza, burgers)
var Genre = require('../models/genre');
var _ = require('lodash');

module.exports = function(app){

	app.get('/list',function(req,res){
		Genre.find({},function(err,data){
			var list =  [];
      if (err) return res.status(500).send('server error');
      if(data) {
	      _.forEach(data, function (info) {
	        list.push(info.name);
	      });
  		}
    	res.send({list:list});
    });
	});

  app.get('/list/:restaurant',function(req,res){
    Genre.find({name:req.params.restaurant},function(err,data){
      if (err) return res.status(500).send('server error');
      res.send({list:data.list});
    });
  });



	app.post('/test/addGenre',function(req,res){
		var arr = req.body.array;
		var cat = new Genre();
		cat.name = req.body.genre;
		for(var i = 0; i < arr.length; i++){
			cat.add(arr[i]);
		}
		cat.save(function(err,data){
			res.send("Genre Saved");
		})

	})

};


