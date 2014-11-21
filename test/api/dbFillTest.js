'use strict';
//process.env.MONGO_URL = 'mongodb://localhost/wom_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;
var test = 1;
var url = (test) ? 'localhost:3000' : 'https://immense-fjord-7475.herokuapp.com';

/*
if(test) {
  after(function (done) {
    mongoose.connection.db.dropDatabase( function(err) {
      if(err) {
        console.log(err);
        return;
       }
      console.log('collection dropped');
      done();
    });
  });
}*/

var jwt;

describe('user create/login database tests', function() {
  it('should be able to create an user, with a token sent back', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': 'email@example.com',
           'name' : 'iPhone',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      done();
    });
  });
});

describe('wom database tests', function(){
  var testaurant = 'testaurant';
  var genre = 'burger';
  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': 'burger-king'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql( 'burger-king has been added');
      done();
    });
  });

  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': 'specialitys'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('specialitys has been added');
      done();
    });
  });

  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': 'mcdonalds'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('mcdonalds has been added');
      done();
    });
  });

  it('should add a comment in a restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'mcdonalds',
           'rating': [5,4,5,2,4],
           'genre': genre,
           'str': 'I love mcdonalds burger so freaking much'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

  it('should add a comment in a restaurant with regex', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'specialitys',
           'rating': [4,3,4,1,5],
           'genre': genre,
           'str': 'specialitys has a unquie burger'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

  it('should add a comment with a different genre', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'burger-king',
           'rating': [3,3,4,1,3],
           'genre': genre,
           'str': 'burger burger burger burger'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

  it('should add a comment with a different genre with a different restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'burger-king',
           'rating': [1,2,4,2,3],
           'genre': 'pizza',
           'str': 'pizza pizza pizza pizza'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

  it('should add a comment with a different genre', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'specialitys',
           'rating': [2,2,4,2,3],
           'genre': 'tacos',
           'str': 'wait, they have taocs?'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });
});
