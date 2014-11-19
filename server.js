'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');

var app = express();


//heroku test ////////////////////
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://heroku_app31608608:niir070ammh026ph0ujvcvlt0d@ds053380.mongolab.com:53380/heroku_app31608608';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);


var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connected to local database');
});

// route middleware that will happen on every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

//mongoose.connect(mongooseUri, options);


//local test
mongoose.connect(process.env.MONGO_URL || mongooseUri || 'mongodb://localhost/wom_development', options);


app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
//app.set('secret', process.env.SECRET || 'changethistoo');
var nameValidate = require('./lib/validator')();
var restRouter = express.Router();
require('./routes/restaurant_routes')(restRouter, nameValidate);
app.use('/rest', restRouter);


var categoryRouter = express.Router();
require('./routes/categories_routes')(categoryRouter);
app.use('/cat',categoryRouter);

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

require('./routes/users_routes')(app, passport);

//using router from Express 4.0
var addCat = require('./lib/addCat')();
var authRouter = express.Router();
authRouter.use(jwtauth);
require('./routes/comments_routes')(authRouter,nameValidate,addCat);
app.use('/comment', authRouter);

require('./routes/yelpSearch_routes')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
