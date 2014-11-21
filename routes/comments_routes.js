'use strict';
//endpoints for viewing and posting comments and ratings
var Restaurant = require('../models/restaurant');
module.exports = function (app, nameValidate, addCat, ratingFill) {
  //adds comments and ratings
  app.post('/add', nameValidate, addCat, ratingFill, function (req, res) {
    var rateArray = req.body.rating;
    var catsArray = req.newRate.catsArray;
    for (var i = 0; i < rateArray.length; i++) {
      var object = {};
      object[catsArray[i]] = rateArray[i];
      req.newRate.catsArray[i] = object;
    }
    req.user.addNewRating(req.newRate);
    req.user.save(function (err) {
      if (err)
        return res.status(500).send('could not update comment');
    });
    Restaurant.findOne({ 'name': req.body.restaurant }, function (err, rest) {
      if (err)
        return res.status(500).send('internal server search error');
      rest.addRating(req.newRate, req.body.rating);
      rest.save(function (err) {
        if (err)
          return res.status(500).send('internal server error');
      });
    });
    res.send('comment added');
  });
  //list users own comments
  app.get('/user/list', function (req, res) {
    res.send({ ratingArray: req.user.listRatingObjects() });
  });
};
