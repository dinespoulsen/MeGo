'use strict';
import routes from './app/routes.js';
import memoriesRouter from './app/memoriesRouter.js';
import timeRouter from './app/timeRouter.js';
import goalsRouter from './app/goalsRouter.js';
import usersRouter from './app/usersRouter.js';

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, '/public')))
app.use('/users', express.static(path.join(__dirname, '/public')))
app.use('/memories', express.static(path.join(__dirname, '/public')))

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


memoriesRouter(app, passport);
timeRouter(app, passport);
goalsRouter(app, passport);
usersRouter(app, passport);
routes(app, passport);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
