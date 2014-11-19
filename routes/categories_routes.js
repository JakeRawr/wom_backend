'use strict';

var Category = require('../models/category');
var _ = require('lodash');

module.exports = function(app){

	app.get('/list',function(req,res){
		Category.find({},function(err,data){
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
    Category.find({name:req.params.restaurant},function(err,data){
      if (err) return res.status(500).send('server error');
      res.send({list:data.list});
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



