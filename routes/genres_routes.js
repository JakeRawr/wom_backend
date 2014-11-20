'use strict';
//genres of food (pizza, burgers)
var Genre = require('../models/genre');
var _ = require('lodash');
module.exports = function (app) {
  app.get('/list', function (req, res) {
    Genre.find({}, function (err, data) {
      var list = [];
      if (err)
        return res.status(500).send('server error');
      if (data) {
        _.forEach(data, function (info) {
          list.push(info.name);
        });
      }
      res.send({ list: list });
    });
  });
  //returns the category rating criteria for each genre
  app.get('/cat/:genre', function (req, res) {
    Genre.findOne({ 'name': req.params.genre }, function (err, data) {
      res.send({ cats: data.cats });
    });
  });
  //returns all restaurants associated with genre
  app.get('/listRests/:genre', function (req, res) {
    Genre.findOne({ 'name': req.params.genre }, function (err, data) {
      res.send({ restList: data.restList });
    });
  });
  app.post('/test/addGenre', function (req, res) {
    var cat = new Genre();
    cat.name = req.body.genre;
    for (var i = 0; i < req.body.array.length; i++) {
      cat.add(req.body.array[i]);
    }
    cat.save(function (err, data) {
      if (err)
        return res.status(500).send('server err');
      res.send('Genre Saved');
    });
  });
};