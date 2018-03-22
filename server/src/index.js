// @flow
import express from 'express'
import type { $Request, $Response } from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')))

app.get('*', (req: $Request, res: $Response) => res.sendFile(
  path.join(__dirname, '..', '..', 'client', 'build', 'index.html')))

  //==============================================================
  // Server side =================================================
  //==============================================================

const  logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      passport = require('passport');
  var database=require('./config/db.js');
  //===============EXPRESS================
  app.use(logger('combined'));
  app.set('secret','oursecret')
  mongoose.connect('mongodb://' +database.mongodbUser+':'+database.mongodbPass+'@'+database.mongodbHost + ':11309/aws-web');
  app.use(cookieParser('doesthisreallymatterdoesthislifereallymatter'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(session({secret: 'doesthisreallymatterdoesthislifereallymatter', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  // Session-persisted message middleware
  app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
  });
  //===============PASSPORT===============

  require('./passport')(passport);

  //===============ROUTES===============
  require('./routes.js')(app,passport);

  //===============PORT=================
  var port = process.env.PORT || 5000;
  app.listen(port);
  console.log("listening on " + port + "!");
