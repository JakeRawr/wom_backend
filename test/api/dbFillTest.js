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
var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDZlYTgwOTk2YWZlMDAyMDBmMjdhYjUifQ.TXDfccAab9J66wPy_PVhSrSmNPZ6-6y9wPqTV1xomxE'

describe('user create/login database tests', function() {
  var email = 'tiger@email.com';
  it('should be able to login with existing email and a token sent back', function (done) {
    chai.request(url) //change this
    .get('/api/users')
    .auth(email,'passwordddd')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

});

describe('wom database tests', function(){
  var testaurant1 = '';
  var gen1 = 'sushi-rolls';
  var testaurant2 = 'sushi-land'
  var gen2 = 'sushi-rolls';

  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': testaurant1})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql(testaurant1+ ' has been added');
      done();
    });
  });
  

  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': testaurant2})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql(testaurant2+ ' has been added');
      done();
    });
  });


  it('should add a comment in a restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': testaurant1,
           'rating': [5,5,5,5,5],
           'genre': gen1,
           'str': 'Best sushi ever, and so cheap'})
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
    .send({'restaurant': testaurant2,
           'rating': [5,5,5,5,5],
           'genre': gen2,
           'str': 'I love sushiiiiiiiiii'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });


  describe('yelp api tests', function(){
    it('should be able to get a list of nearby restaurant', function (done) {
      chai.request(url) //change this
      .get('/search')
      .timeout(5000)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('list');
        expect(res.body.list[0]).to.have.property('name');
        expect(res.body.list[0]).to.have.property('ll');
        done();
      });
    });
  });
});
