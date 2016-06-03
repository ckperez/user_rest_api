'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const User = require(__dirname + '/../model/user');
const basicHTTP = require(__dirname + '/../lib/basic_http');

const router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res, next)=>{
  let newUser = new User(req.body);
  let hashedPassword = newUser.hashPassword();
  newUser.password = hashedPassword;
  req.body.password = null;
  User.findOne({username:req.body.username}, (err, user)=>{
    if (err || user) return next(new Error('Could not create user - User exists or error checking'));
    newUser.save((err, user)=>{
      if (err) return next(new Error('Could not create user - Error saving user info'));
      res.json({token:user.generateToken(), message: 'Welcome to the club. Like your token? It\'s just for you'});
    });
  });
});

router.get('/signin', basicHTTP, (req, res, next)=>{
  User.findOne({username:req.auth.username}, (err, user)=>{
    if (err || !user) return next(new Error('Could not sign in'));
    if (!user.comparePassword(req.auth.password)) return next(new Error('Could not sign in'));

    res.json({message: `Welcome back, ${user.username}.`});
  });
});
