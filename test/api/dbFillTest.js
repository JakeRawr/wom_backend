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
  var email = 'test123@example.com';
  it('should be able to create an user, with a token sent back', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': 'JakeYang@hotmail.com',
           'name' : 'Jacob',
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
    .send({'restaurant': 'blue-moon-burgers'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('blue-moon-burgers has been added');
      done();
    });
  });

  it('should be able to add a restaurant if the restaurant doesn\'s exist', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': 'red-mill-burgers'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('red-mill-burgers has been added');
      done();
    });
  });


  it('should add a comment in a restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'blue-moon-burgers',
           'rating': [4,4,5,1,4],
           'genre': 'burger',
           'str': 'Too many people from amazon....'})
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
    .send({'restaurant': 'red-mill-burgers',
           'rating': [3,3,3,3,3],
           'genre': 'pizza',
           'str': 'just kidding, no pizza here'})
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
    .send({'restaurant': 'red-mill-burgers',
           'rating': [1,2,4,2,3],
           'genre': 'burger',
           'str': 'I really liked the atmosphere and the speed'})
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

  //url: cat/list
  it('should display all genre lists', function (done) {
    chai.request(url) //change this
    .get('/genre/list')
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('list');
      done();
    });
  });

  it('should display genre lists from a restaurant', function (done) {
    chai.request(url) //change this
    .get('/rest/genres/' + testaurant)
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('list');
      done();
    });
  });

  it('should display the restaurants given a genre', function (done) {
    chai.request(url) //change this
    .get('/genre/listRests/' + genre)
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('restList');
      done();
    });
  });

  it('should display the rating categories array', function (done) {
    chai.request(url) //change this
    .get('/genre/cat/' + genre)
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('cats');
      done();
    });
  });


  it('should display avg rating of a genre of a restaurant', function (done) {
    chai.request(url) //change this
    .get('/rest/avg/' + genre + '/' + testaurant)
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('avgObject');
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
