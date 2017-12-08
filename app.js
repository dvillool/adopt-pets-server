const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const response = require('./helpers/response');
const configurePassport = require('./helpers/passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);



//rutes de backend, les que jo faig servir, no les que es mostren pel browser
const auth = require('./routes/auth');
const animal = require('./routes/animal');
const profile = require('./routes/profile');
const index = require('./routes/index');

const app = express();

// db

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/adoptPets', {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

// session

app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 12 * 60 * 60 // 1 day
    }),
    secret: 'adoptPets',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes

app.use('/', index);
app.use('/auth', auth);
app.use('/animal', animal);
app.use('/profile', profile);

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