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
}
*/
var jwt;

describe('user create/login database tests', function() {
  var email = 'test1234@example.com';
  it('should be able to create an user, with a token sent back', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': 'JackVang@gmail.com',
           'name' : 'Jackk',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      //expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      done();
    });
  });

});

describe('wom database tests', function(){
  var testaurant1 = 'pho bac';
  var gen1 = 'pho';
  var testaurant2 = 'pho vien anh'
  var gen2 = 'pho';
  /*
  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': 'testaurant'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql( testaurant + ' has been added');
      done();
    });
  });
*/
// AAAAAADDSSSSSSSSSSS
  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': testaurant})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql(testaurant1+ 'has been added');
      done();
    });
  });

  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': 'red-mill-burgers'})
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
           'rating': [1,2,3,2,2],
           'genre': gen1,
           'str': 'This pho is alright...I guess??'})
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
           'rating': [3,3,3,3,3],
           'genre': gen2,
           'str': 'I actuall don\'t know anything about pho'})
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
