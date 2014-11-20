'use strict';

var Restaurant = require('../models/restaurant');

//auth is a middleware which already processed the user comfirmation
module.exports = function(app,nameValidate,addCat,ratingFill) {
  //adding a comment
  app.post('/add', nameValidate, addCat, ratingFill, function (req, res) {
    var rateArray = req.body.rating;

    //from rating object;
    var catsArray = req.newRate.catsArray;

    for(var i = 0; i< rateArray.length; i++){
      var object = {};
      object[catsArray[i]] = rateArray[i];
      req.newRate.catsArray[i] = object;
    }

    req.user.addNewRating(req.newRate);
    req.user.save (function (err) {
      if (err) return res.status(500).send('could not update comment');
    });
    //adds new rating object returned from middleware to restaurant
    Restaurant.findOne({'name':req.body.restaurant}, function(err, rest){
      if (err) return res.status(500).send('internal server search error');
      //if the restaurant exists, send all comments
      rest.addRating(req.newRate);
      rest.save(function (err) {
        if (err) return res.status(500).send('internal server error');
      });
    });
    res.send('comment added');
  });


  //list users own comments
  app.get('/user/list', function (req, res) {
    res.send({ratingArray : req.user.listRatingObjects()});
  });
};
