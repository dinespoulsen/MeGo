'use strict';
import routes from './app/routes.js';
import app from './app';
import passport from 'passport';
import configPassport from './config/passport.js';

const PORT = process.env.PORT || 3000;

configPassport(passport);
routes(app, passport);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
