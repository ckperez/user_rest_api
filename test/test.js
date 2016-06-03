'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const User = require('../model/user');
const mongoose = require('mongoose');
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

require('../server');

test...
