var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var ping = require('ping');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.locals.pingResults = [];
app.locals.hosts = [
  {"host": "192.168.1.1", "name": "localhost"},
  {"host": "google.com", "name": "google"},
  {"host": "yahoo.com", "name": "yahoo"}
];

setInterval(function() {

  app.locals.pingResults = []

  app.locals.hosts.forEach(function(item){
      ping.sys.probe(item.host, function(isAlive){
          var msg = isAlive ? 'host ' + item.host + ' is alive' : 'host ' + item.host + ' is dead';
          var isOk = isAlive ? '' : 'KO';
          console.log(msg);
          app.locals.pingResults.push({"result":isOk, "host": item.host, "name": item.name});
      });
  });

}, 5000);

module.exports = app;
