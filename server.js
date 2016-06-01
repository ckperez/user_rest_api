'use strict';

const app = require('express')();
const authRoutes = require(__dirname + '/route/auth_routes');
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/auth_db');

app.use('/', authRoutes);

app.listen(3000, ()=>{
  console.log('Server way the fudge up on THREE THOUSAND!');
});
