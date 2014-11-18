'use strict';

var User = require('../models/user');
var _ = require('lodash');

module.exports = function (app) {
  var yelp = require("node-yelp");

    //set up oauth
    var client = yelp.createClient({
      oauth: {
        "consumer_key": "piI1pw71-iEVd38fPvhKuw",
        "consumer_secret": "AUWfVM9wfjgAkmjXQzXzjJKsx7A",
        "token": "u4GnA0Rk4Z3Rx3TPJaVrtvPHwkzj9KHM",
        "token_secret": "KMcZXe0GvxYEwviNqqnUXMHTOPI"
      },

      // Optional settings:
      httpClient: {
        maxSockets: 10  // ~> Default is 10
      }
    });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  // do http://api.yelp.com/v2/search?term=searchTerm&ll=lat,lon&category_filter=category&sort=1
  // return list of restaurant names
  app.get('/search', function (req, res) {
    var lat = req.body.lat || 47.6231947;
    var lon = req.body.lon || -122.3372779;
    var searchTerm = req.body.searchTerm || "restaurant";
    var category = req.body.category || "food";
    client.search({
      terms: searchTerm,
      ll: lat + "," + lon,
      category_filter: category,
      sort: 1
    }).then(function (data) {
      var businessesName = [];
      var businesses = _.map(data,businesses)[2];
      _.forEach(businesses, function (info) {
        businessesName.push(info.name);
      });
      res.json({names: businessesName});
    });
  });

  app.get('/search/test',function(req,res){
    var lat = req.body.lat || 47.6231947;
    var lon = req.body.lon || -122.3372779;
    var searchTerm = req.body.searchTerm || "restaurant";
    var category = req.body.category || "food";
    client.search({
      terms: searchTerm,
      ll: lat + "," + lon,
      category_filter: category,
      sort: 1
    }).then(function (data) {
      var businessesName = [];
      var businesses = _.map(data,businesses)[2];
      _.forEach(businesses, function (info) {
        businessesName.push(info);
      });
      res.json({names: businessesName});
    });
  })










};
