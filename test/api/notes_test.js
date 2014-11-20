'use strict';
process.env.MONGO_URL = 'mongodb://localhost/wom_test';
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;
var test = 1;
var url = (test) ? 'localhost:3000' : 'https://immense-fjord-7475.herokuapp.com';


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

var jwt;

describe('user create/login database tests', function() {

  var email = 'test123@example.com';
  it('should be unable to create an user with passwordConfrim fails', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': email,
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfrim': 'foobar1234'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('passwords did not match');
      done();
    });
  });

  it('should be unable to create an user with an unvailded email', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': 'test',
           'name' : 'test1',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('Please enter a valid email');
      done();
    });
  });

  it('should be able to create an user, with a token sent back', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': email,
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      jwt = res.body.jwt;
      done();
    });
  });

  it('should be able to login with existing email and a token sent back', function (done) {
    chai.request(url) //change this
    .get('/api/users')
    .auth(email,'foobar123')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

  it('should be unable to create an existing user', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': email,
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('email already existed');
      done();
    });
  });

  it('should be unable to create an user whose username is taken', function (done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': "rename@example.com",
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('username taken');
      done();
    });
  });
});

describe('wom database tests', function(){
  var testaurant = 'testaurant';
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

  it('should be able to list comments of the restaurant if the restaurant exists', function (done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'restaurant': testaurant})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.be.eql(testaurant);
      expect(res.body).to.have.property('commentsCollection');
      done();
    });
  });

  it('should be able to add categories into a genre', function (done) {
    chai.request(url) //change this
    .post('/genre/test/addGenre')
    .send({'genre': 'burger','array': ['bun', 'meat','cheese','vege','sauce']})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.have.eql('Genre Saved');
      done();
    });
  });

  it('should add a comment in a restaurant', function (done) {
    chai.request(url) //change this
    .post('/comment/add')
    .set('jwt', jwt)
    .send({'restaurant': 'testaurant',
           'rating': [5,4,3,2,1],
           'genre': 'burger',
           'str': 'testing add a comment1'})
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
    .send({'restaurant': 'TEst*@)aurant',
           'rating': [5,4,3,2,1],
           'genre': 'burger',
           'str': 'testing add a comment2'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('comment added');
      done();
    });
  });

  it('should display a list of user\'s comments', function (done) {
    chai.request(url) //change this
    .get('/comment/user/list')
    .set('jwt', jwt)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('ratingArray');
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
