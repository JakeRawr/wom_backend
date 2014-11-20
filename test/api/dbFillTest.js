'use strict';
process.env.MONGO_URL = 'mongodb://localhost/wom_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;
var test = 0;
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
}
*/

var jwt;
var testaurant = 'testaurant';
describe('user create/login database tests', function() {
  it('should be able to login with existing email and a token sent back', function (done) {
      chai.request(url) //change this
      .get('/api/users')
      .auth('example@example.com','passwrod')
      .end(function(err, res) {
        jwt = res.body.jwt;
        expect(err).to.eql(null);
        expect(res.body).to.have.property('jwt');
        done();
      });
   });
it('should add a comment in a restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'testaurant',
           'rating': [5,5,5,5,5],
           'genre': 'burger',
           'str': 'Comment, 10:13am'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

   
  it('should display a list of comments from a restaurant', function (done) {
    chai.request(url) //change this
    .get('/rest/comments/' + testaurant)
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('genre');
      expect(res.body).to.have.property('ratings');
      done();
    });
  });

  it('should display genre lists from a restaurant', function (done) {
    chai.request(url) //change this
    .get('/rest/genres/' + testaurant)
    .set('jwt', jwt)
    .end(function(err, res) {
      console.log(res.body.list)
      expect(err).to.eql(null);
      expect(res.body).to.have.property('list');
      done();
    });
  });

});






