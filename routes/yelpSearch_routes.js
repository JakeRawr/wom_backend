'use strict';
var _ = require('lodash');
module.exports = function(app) {
  var yelp = require('node-yelp');
  //set up oauth
  var client = yelp.createClient({
    oauth: {
      consumer_key: process.env.YELP_CONSUMER_KEY,
      consumer_secret: process.env.YELP_CONSUMER_SECRET,
      token: process.env.YELP_TOKEN,
      token_secret: process.env.YELP_TOKEN_SECRET
    },
    // Optional settings:
    httpClient: {
      maxSockets: 10  // ~> Default is 10
    }
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  // do http://api.yelp.com/v2/search?term=searchTerm&ll=lat,lon&category_filter=category&sort=1
  // return list of restaurant names
  app.get('/search', function(req, res) {
    var lat = req.body.lat || 47.6231947;
    var lon = req.body.lon || -122.3372779;
    var searchTerm = req.body.searchTerm || 'restaurant';
    var category = req.body.category || 'food';
    client.search({
      terms: searchTerm,
      ll: lat + ',' + lon,
      category_filter: category,
      sort: 1
    }).then(function(data) {
      var businessesNameLL = [];
      var businesses = _.map(data, businesses)[2];
      _.forEach(businesses, function(info) {
        businessesNameLL.push({
          name: info.name,
          ll: info.location.coordinate.latitude + ',' + info.location.coordinate.longitude,
          phone: info.phone
        });
      });
      res.json({ list: businessesNameLL });
    });
  });
};
