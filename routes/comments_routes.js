'use strict';

var Comment = require('../lib/comment');
var Restaurant = require('../models/restaurant');

//auth is a middleware which already processed the user comfirmation
module.exports = function(app,nameValidate) {
  //adding a comment
  app.post('/add', nameValidate,function (req, res) {
    var comment = new Comment(req.user.name,
                              req.body.crating,
                              req.body.str,
                              req.body.category,
                              req.body.restaurant);
    req.user.addNewComment(comment, req.body.restaurant);
    req.user.save (function (err) {
      if (err) return res.status(500).send('could not update comment');
    });

    Restaurant.findOne({'name':req.body.restaurant}, function(err, rest){
      if (err) return res.status(500).send('internal server search error');
      //if the restaurant exists, send all comments
      rest.addNewComment(comment);
      rest.save(function (err, data) {
        if (err) return res.status(500).send('internal server error');
      });
    });
    res.send('comment added');
  });

  //list users own comments
  app.get('/list', function (req, res) {
    res.send(req.user.listComments()[0]);
  });
};
