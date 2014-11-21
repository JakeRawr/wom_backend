'use strict';
var Rating = require('../lib/rating');
var Average = require('../lib/averageRating');
var Restaurant = require('../models/restaurant');
var _ = require('lodash');
module.exports = function(app, nameValidate, findGenre) {
  //retruns all restaurants
  app.get('/list', function(req, res) {
    Restaurant.find({}, function(err, data) {
      var list = [];
      if (data) {
        _.forEach(data, function(info) {
          list.push(info.name);
        });
      }
      res.send({ list: list });
    });
  });
  // returns list of comments from chosen restaurant given the name
  app.get('/comments/:restaurant', function(req, res) {
    Restaurant.findOne({ name: req.params.restaurant }, function(err, rest) {
      if (err)
        return res.status(500).send('server error: get comments');
      //if the restaurant exists, send all comments
      if (rest) {
        var list = [];
        return res.send(rest.commentsCollection);
      }
    });
  });
  //returns the genres of restaurant
  app.get('/genres/:restaurant', function(req, res) {
    Restaurant.findOne({ name: req.params.restaurant }, function(err, data) {
      if (err)
        return res.status(500).send('server error: get comments');
      //if the restaurant exists, send all comments
      var list = [];
      _.forEach(data.commentsCollection, function(info) {
        list.push(info.genre);
      });
      res.send({ list: list });
    });
  });
  //add a new restaurant to collection, given the name
  app.post('/addRest', nameValidate, function(req, res) {
    Restaurant.findOne({ name: req.body.restaurant }, function(err, rest) {
      if (err)
        return res.status(500).send('server error: post new rest');
      //should res.send comments of existing restaurant.
      if (rest)
        return res.send(rest);
      var newRest = new Restaurant();
      newRest.name = req.body.restaurant;
      newRest.save(function(err) {
        if (err)
          return res.status(500).send('server error: post new rest');
        res.send(req.body.restaurant + ' has been added');
      });
    });
  });
  //returns the average object of given genre and restaurant
  app.get('/avg/:genre/:restaurant', findGenre, function(req, res) {
    Restaurant.findOne({ name: req.params.restaurant }, function(err, rest) {
      var overall;
      var list = [];
      _.forEach(rest.commentsCollection, function(restData) {
        if (restData.genre === req.params.genre) {
          overall = restData.avg[0];
          for (var i = 0; i < req.genreCats.length; i++) {
            var object = {};
            object[req.genreCats[i]] = restData.avg[0].catAvgArray[i];
            overall.catAvgArray[i] = object;
          }
          res.send({ avgObject: overall });
        }
      });
    });
  });
};
