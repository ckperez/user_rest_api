'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const basicHTTP = require(__dirname + '/../lib/basic_http');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

const secret = process.env.SECRET || 'changeme';

require('../server');

describe('Auth tests', ()=>{
  it('should...', ()=>{
    let testAuth = 'Basic ' + new Buffer('username:password').toString('base64');
    let req = {};
    let res = {};
    req.headers = {authorization:testAuth};

    basicHTTP(req, res, ()=>{
      expect(req.auth.username).to.eql('username');
      expect(req.auth.password).to.eql('password');
    });
  });
});
