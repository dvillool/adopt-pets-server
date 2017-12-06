const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const response = require('./helpers/response');



//rutes de backend, les que jo faig servir, no les que es mostren pel browser
const auth = require('./routes/auth');
const animals = require('./routes/animals');
const profile = require('./routes/profile');
const index = require('./routes/index');

const app = express();

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    response.notFound(req, res);
});

// NOTE: requires a views/error.ejs template
app.use(function(err, req, res, next) {
    // always log the error
    console.error('ERROR', req.method, req.path, err);

    // only send if the error ocurred before sending the response
    if (!res.headersSent) {
        response.unexpectedError(req, res, err);
    }
});

module.exports = app;