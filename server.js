'use strict';
import routes from './app/routes.js';
import passport from 'passport';
import configPassport from './config/passport.js';
import express from 'express';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import configDB from './config/database.js';
import path from 'path';
import { Server } from 'http';

const app = express();
const server = new Server(app);

mongoose.connect(configDB.url, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + configDB.url + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + configDB.url);
  }
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')))
app.use('/users', express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

const PORT = process.env.PORT || 3000;
configPassport(passport);
routes(app, passport);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
