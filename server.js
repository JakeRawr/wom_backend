'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');

var app = express();

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

//connect to local database
mongoose.connect(mongooseUri, options);

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
//app.set('secret', process.env.SECRET || 'changethistoo');

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwt_auth')(app.get('jwtSecret'));

require('./routes/users_routes')(app, passport);
//using traditional app
//app.use(jwtauth); This add jwtauth middleware everywhere!
//require('./routes/notes_routes')(app);


//using router from Express 4.0
var notesRouter = express.Router();
notesRouter.use(jwtauth);
require('./routes/notes_routes')(notesRouter);
app.use('/v1', notesRouter);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
