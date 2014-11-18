'use strict';

var Comment = require('../lib/comment');
var Restaurant = require('../models/restaurant');

//auth is a middleware which already processed the user comfirmation
module.exports = function(app) {
  //adding a comment
  app.post('/add', function (req, res) {
    var comment = new Comment(req.user.name,
                              req.body.rating,
                              req.body.str,
                              req.body.category,
                              req.body.restaurant);
    req.user.addNewComment(comment, req.body.restaurant);
    req.user.save (function (err) {
      if (err) return res.status(500).send('save error');
    });

    Restaurant.findOne({'name':req.body.restaurant}, function(err, rest){
      if (err) return res.status(500).send('server error: get comments');
      //if the restaurant exists, send all comments
      rest.addNewComment(comment);
      rest.save(function (err, data) {
        if (err) return res.status(500).send('save error');
        res.send(data);
      });
      //res.send(rest.commentsCollection);
    });
    //res.send('comment added');
  });

  //list users comments
  app.get('/list', function (req, res) {
    res.send(req.user.listComments());
  });
};
