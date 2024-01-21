var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./models/User');

var router = require('./routes/index');

var app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use('/', router);
app.use(passport.initialize());

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload.sub})
    .then((user) => {
      if (user) {
        return done(null, user)
      }
      else {
        return done(null, false)
      }
    })
    .catch(err => done(err, null))
}));


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

// Mongoose connection
async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_KEY).then(() => console.log('Database connected!'));
    const db = mongoose.connection;
  
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  } catch (err) {
    console.log(err);
  }  
}

dbConnect();


module.exports = app;
