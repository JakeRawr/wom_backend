'use strict';
process.env.MONGO_URL = 'mongodb://localhost/wom_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;
var test = 1;
var url = (test) ? 'localhost:3000' : 'https://immense-fjord-7475.herokuapp.com';

describe('user database tests', function() {
  var email = 'test123@example.com';
  it('should be unable to create an user with passwordConfrim fails', function(done) {
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

  it('should be unable to create an user with an unvailded email', function(done) {
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

  it('should be able to create an user, with a token sent back', function(done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': email,
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

  it('should be able to login with existing email and a token sent back', function(done) {
    chai.request(url) //change this
    .get('/api/users')
    .auth(email,'foobar123')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('jwt');
      done();
    });
  });

  it('should be unable to create an existing user', function(done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': email,
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('cannot create that user');
      done();
    });
  });

  it('should be unable to create an user with an unvailded email', function(done) {
    chai.request(url) //change this
    .post('/api/users')
    .send({'email': "rename@example.com",
           'name' : 'Jake',
           'password': 'foobar123',
           'passwordConfirm': 'foobar123'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('Please enter a valid email');
      done();
    });
  });
});

describe('wom database tests', function(){
  it('should be able to add a restaurant', function(done) {
    chai.request(url) //change this
    .post('/rest/addRest')
    .send({'name': 'Testaurant'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.be.eql('Testaurant has been added');
      done();
    });
  });
});
