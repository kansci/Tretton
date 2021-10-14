const express = require('express');
const bodyParser = require('body-parser');
const ODM = require('mongoose');
const app = express();

// ! ##### Middlewares #####
// ? -----------------------
// * dotenv middleware
require('dotenv').config();

// * BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ? Routes files
// const ScrapCoworkers = require('./helpers/scraper');
const GetCoworkers = require('./routes/getCoworkers');
const GetCoworker = require('./routes/getCowerker');
const EditCoworker = require('./routes/editCoworker');
const Login = require('./routes/login');

// ? Router middleware
// app.use('/api', ScrapCoworkers);
app.use('/api', GetCoworkers);
app.use('/api', GetCoworker);
app.use('/api', EditCoworker);
app.use('/api', Login);

// ! ##### Server #####
// ? -----------------------

app.listen(process.env.PORT, () => {
  ODM.connect(process.env.MONGODB_URI);

  // ? Colorized terminal message
  console.log(`\n\x1b[1m\x1b[33m## SERVER STRATED ON PORT:\x1b[0m\x1b[1m \x1b[32m${process.env.PORT} ## \x1b[0m`);

  console.log(`\x1b[1m\x1b[33m## ADDRESS:\x1b[0m\x1b[1m \x1b[32m${process.env.BASE_URL} ## \x1b[0m \n`);

  // console.log(`\x1b[1m\x1b[33m## ENVIRONMENT:\x1b[0m\x1b[1m \x1b[32m${process.env.ENVIRONMENT} ## \x1b[0m \n`);

  ODM.connection.on('error', error => {
    console.log(`\x1b[41m\x1b[1mODM error\x1b[0m`, error);
  });

  console.log(`\x1b[34m\x1b[1mconnection to ODM...\x1b[0m`);
  ODM.connection.on('connected', () => {
    console.log(`\x1b[34m\x1b[1msuccessfully connected to ODM!\x1b[0m`);
  });

});
