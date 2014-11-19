'use strict';

var Restaurant = require('../models/restaurant');
var Rating = require('../lib/rating');

//auth is a middleware which already processed the user comfirmation
module.exports = function(app,nameValidate,addCat) {
  //adding a comment
  app.post('/add', nameValidate, addCat, function (req, res) {
    var rateArray = req.body.rating;

    var newRate = new Rating(req.user.name, req.body.str, req.body.genre, req.body.restaurant);

    //from rating object;
    var catsArray = newRate.catsArray;

    console.log('catsArray: ' + catsArray);
    console.log('rateArray: ' + rateArray);

    for(var i = 0; i< rateArray.length; i++){
      newRate.catsArray[i] =  {'category': catsArray[i], 'rating': rateArray[i]};
    }

    req.user.addNewRating(newRate);
    req.user.save (function (err) {
      if (err) return res.status(500).send('could not update comment');
    });

    Restaurant.findOne({'name':req.body.restaurant}, function(err, rest){
      if (err) return res.status(500).send('internal server search error');
      //if the restaurant exists, send all comments
      rest.addRating(newRate);
      rest.save(function (err) {
        if (err) return res.status(500).send('internal server error');
      });
    });
    res.send('comment added');
  });

  //list users own comments
  app.get('/list', function (req, res) {
    res.send({listRatingObjects : req.user.listRatingObjects()});
  });
};
