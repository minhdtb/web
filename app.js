var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var _ = require('lodash');
var MobileDetect = require('mobile-detect');

var app = express();

app.set('views', path.join(__dirname, 'views'));

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/***
 * Initial route
 */
app.use(function (req, res, next) {
    var md = new MobileDetect(req.headers['user-agent']);
    var categoryList = require('./data/category');
    var count = categoryList.length / 4;

    res.locals.request = req;
    res.locals._ = _;

    var moment = require('moment')
    moment.locale('vi');
    res.locals.moment = moment;

    res.locals.categories = _.chunk(categoryList, count)
    res.locals.extension = md.is('Webkit') ? 'webp' : 'jpeg';
    res.locals.req = req;
    res.locals.helper = {
        checkUrl: function (req, patern) {
            return (patern === req.path.split('/')[1]);
        }
    };

    if (req.query.link) {
        res.locals.link = String(req.query.link);
    } else {
        res.locals.link = String(1);
    }

    next();
});

app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
