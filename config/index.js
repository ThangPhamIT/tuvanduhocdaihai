var express         = require('express');
var bodyParser      = require('body-parser');
var expressLayouts  = require('express-ejs-layouts');
var nodemailer      = require('nodemailer');
var cookieParser    = require('cookie-parser');
var expressValidator = require('express-validator');
var expressSession  = require('express-session');

module.exports = function (app) {
    // use ejs and express layouts
    //middleware
    app.set('view engine', 'ejs');
    app.use(expressLayouts);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(cookieParser());
    app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

}

