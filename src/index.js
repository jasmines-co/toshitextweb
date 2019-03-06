const mongoose = require('mongoose');
const util = require('util');
const express = require('express')

// config should be imported before importing any other file
const config = require('./config/config');

const app = require('./config/express');
const debug = require('debug')('toshi-text-launchsite:index');

// eslint-disable-next-line no-unused-vars
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
const multer = require('multer');

const hbs = require('express-handlebars');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  // eslint-disable-next-line no-path-concat
  layoutsDir: __dirname + '/views/layouts', // eslint-disable-line prefer-template
  // eslint-disable-next-line no-path-concat
  partialsDir: __dirname + '/views/partials' // eslint-disable-line prefer-template
}));

app.set('view engine', 'hbs');

app.use(express.static('./public/img'));
app.use(express.static('./public/style')); 

mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(
  mongoUri,
  { server: { socketOptions: { keepAlive: 1 } } }
);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// # TODO: Any additional config changes belong here.

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
