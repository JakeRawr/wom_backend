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
    res.send('comment added');
  });

  //list users comments
  app.get('/list', function (req, res) {
    res.json(req.user.listComment());
  });
};