'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');
var app = express();
var uriUtil = require('mongodb-uri');
var mongodbUri = process.env.MONGODBURI;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000
    }
  }
};
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connected to local database');
});
// route middleware that will happen on every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

mongoose.connect(process.env.MONGO_URL || mongooseUri, options);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('jwtSecret', process.env.JWT_SECRET);
//////////Middlewares and routers////////////////
var nameValidate = require('./lib/validator')();
var findGenre = require('./lib/findGenre')();
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));
var addCat = require('./lib/addCat')();
var ratingFill = require('./lib/rating_fill')();
var restRouter = express.Router();
require('./routes/restaurant_routes')(restRouter, nameValidate, findGenre);
app.use('/rest', restRouter);
var genreRouter = express.Router();
require('./routes/genres_routes')(genreRouter);
app.use('/genre', genreRouter);
app.use(passport.initialize());
require('./lib/passport')(passport);
require('./routes/users_routes')(app, passport);
var authRouter = express.Router();
authRouter.use(jwtauth);
require('./routes/comments_routes')(authRouter, nameValidate, addCat, ratingFill);
app.use('/comment', authRouter);
require('./routes/yelpSearch_routes')(app);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
