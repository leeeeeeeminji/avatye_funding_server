var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user/user');
var projectRouter = require('./routes/project/project');
var mypageRouter = require('./routes/user/myPage');
var anotherProfileRouter = require('./routes/user/anotherUserProfile');
var mainprojectRouter = require('./routes/project/main');
var projectDetailRouter = require('./routes/project/detail');
var heartRouter = require('./routes/project/heart');
var followRouter = require('./routes/user/follow');
var categoryRouter = require('./routes/project/category')
//이미지 저장
var imgRouter = require('./routes/project/img');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

let corsOptions = {
  origin: 'https://tumblbug.avatye.com:8080',
  credentials: true
}


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/project',projectRouter);
app.use('/mypage', mypageRouter);
app.use('/u', anotherProfileRouter);
app.use('/main', mainprojectRouter);
app.use('/projectdetail',projectDetailRouter);
app.use('/heart',heartRouter);
app.use('/follow',followRouter);
app.use('/category',categoryRouter);
//이미지
app.use('/img', imgRouter);

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

module.exports = app;