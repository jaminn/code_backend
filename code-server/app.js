var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var session = require('express-session');
var sessionstore = require('sessionstore');
var store = sessionstore.createSessionStore();

var routes = require('./routes/index');
var tutorial = require('./routes/tutorial');
var qna = require('./routes/qna');
var dictionary = require('./routes/dictionary');
var blog = require('./routes/blog');
var my = require('./routes/my');
var login = require('./routes/login');
var signup = require('./routes/signup');



var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/code');
var db = mongoose.connection;

var UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    token: {
        type: String
    }
});


var DicSchema = new mongoose.Schema({
    title: {
        type: String
    },
    writer: {
        type: String
    },
    token: {
        type: String
    },
    date: {
        type: String
    },
    contents: {
        type: String
    },
});

var BoardSchema = new mongoose.Schema({
    writer: {
        type: String
    },
    token: {
        type: String
    },
    title: {
        type: String
    },
    date: {
        type: String
    },
    contents: {
        type: String
    },
    series: {
        type: String
    }
});

var SeriesSchema = new mongoose.Schema({
    token: {
        type: String
    },
    title: {
        type: String
    },
    writer: {
        type: String
    }
});


var QnABoardSchema = new mongoose.Schema({
    writer: {
        type: String
    },
    token: {
        type: String
    },
    title: {
        type: String
    },
    contents: {
        type: String
    },
    date: {
        type: String
    },

    A: [{
        writer: {
            type: String
        },
        title: {
            type: String
        },
        contents: {
            type: String
        },
        date: {
            type: String
        }
    }]
});

Users = mongoose.model('users', UserSchema);
QnABoards = mongoose.model('qnaboards', QnABoardSchema);
Boards = mongoose.model('boards', BoardSchema);
Dics = mongoose.model('dics', DicSchema);
Serieses = mongoose.model('serieses', SeriesSchema);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: store,
    secret: '엥엥',
    saveUninitialized: true
}));

app.use('/', routes);
app.use('/tutorial', tutorial);
app.use('/qna', qna);
app.use('/dictionary', dictionary);
app.use('/blog', blog);
app.use('/my', my);
app.use('/login', login);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
