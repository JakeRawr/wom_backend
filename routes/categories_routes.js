'use strict';

var Category = require('../models/category');
var _ = require('lodash');

module.exports = function(app){
  var list =  [];
	app.get('/list',function(req,res){
		Category.find({},function(err,data){
      if (err) return res.status(500).send('server error');
      _.forEach(data, function (info) {
        list.push({'name': info.name, 'list': info.list});
      });

     	res.send({'list':list});
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



