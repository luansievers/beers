var express = require('express');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var beerRouter = require('./routes/beers');
var xUserMiddleware = require('./middlewares/x-user-middleware.js')

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(xUserMiddleware())

app.use('/beer', beerRouter);

module.exports = app;
