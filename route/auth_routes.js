'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const User = require(__dirname + '/../model/user');
const basicHTTP = require(__dirname + '/../lib/basic_http');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next)=>{
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashPassword();
  newUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username:req.body.username}, (err, user)=>{
    if (err || user) return next(new Error('Could not create user'));
    newUser.save((err, user)=>{
      if (err) return next(new Error('Could not create user'));
      res.json({token:'Hall Pass'});
    });
  });
});

router.get('/signin', basicHTTP, (req, res, next)=>{
  User.findOne({username:req.auth.username}, (err, user)=>{
    if (err || !user) return next(new Error('Could not sign in'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Could not sign in'));

    res.json({token:'Hall Pass'});
  });
});
