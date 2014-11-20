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
describe('user create/login database tests', function() {
  it('should be able to login with existing email and a token sent back', function (done) {
      chai.request(url) //change this
      .get('/api/users')
      .auth('example@example.com','passwrod')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('jwt');
        done();
      });
   });

});

describe('wom database tests', function(){
   var testaurant = 'testaurant';
  it('should be able to list comments of the restaurant if the restaurant exists', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': testaurant})
    .end(function(err, res) {
      console.log(res.body.commentsCollection[0].ratings);
      expect(err).to.eql(null);
      expect(res.body.name).to.be.eql(testaurant);
      expect(res.body).to.have.property('commentsCollection');
      done();
    });
  });

/*
  it('should add a comment in a restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'testaurant',
           'rating': [5,5,5,5,5],
           'genre': 'burger',
           'str': 'testing add a comment1'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

*/

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






