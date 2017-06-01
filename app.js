import express from'express';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import configDB from './config/database.js';
import passport from 'passport';
import path from 'path';

const app = express();
mongoose.connect(configDB.url, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + configDB.url + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + configDB.url);
  }
});

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(session({
  secret: 'testSecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

module.exports = app;
