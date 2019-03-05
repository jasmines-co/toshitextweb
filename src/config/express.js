const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../index.route');
const hbs = require('express-handlebars');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS - Cross Origin Resource Sharing.
app.use(cors());

app.engine('hbs', hbs({ 
    extname: 'hbs', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/client/views/layouts/',
    partialsDir: __dirname + '/client/views/partials/'
}));

app.set('view engine', 'hbs');

// Mount all routes on /api path.
app.use('/', routes);

module.exports = app;
