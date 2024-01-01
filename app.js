var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const {dbHost, dbPort, dbName} = require('./config/config');

const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');
const authAPIRouter = require('./routes/api/auth');
const accountRouter = require('./routes/api/account');

var app = express();

app.use(session({
  name: 'sid', 
  secret: 'atguigu', 
  saveUninitialized: false, 
  resave: true, 
  store: mongoStore.create({mongoUrl: `mongodb://${dbHost}:${dbPort}/${dbName}`}),
  cookie: {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1} //httpOnly:开启后前端无法通过JS操作
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);
app.use('/api', authAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
