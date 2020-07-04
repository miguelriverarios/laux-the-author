var createError = require('http-errors');
const auth = require('../middleware/auth');
var express = require('express');
var exphbs = require("express-handlebars");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var index = require('../routes/index');
var ourStory = require('../routes/our-story');
var myStory = require('../routes/my-story');
var events = require('../routes/events');
var urbanGlossary = require('../routes/urban-glossary');
var contactMe = require('../routes/contact-me');
var purchaseYourCopy = require('../routes/purchase-your-copy');
var myMedia = require('../routes/my-media');
var book = require('../routes/to-all-the-places-ive-had-sex-before');
var myTeam = require('../routes/my-team');
var privacyPolicy = require('../routes/privacy-policy');
var credits = require('../routes/credits');
var helpers = require('handlebars-helpers')();

const app = express();
app.use(favicon(path.join(__dirname, '../../dist/', 'favicon.ico')));

// Uncomment when launching dev site
app.use(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure hbs engine to register handlebars helpers
app.engine("hbs", exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, '../', 'views/partials/'),
  extname: ".hbs",
  helpers: require("../util/helpers.js").helpers
}));

// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../', 'dist')));

app.use('/', index);
app.use('/our-story', ourStory);
app.use('/my-story', myStory);
app.use('/events', events);
app.use('/urban-glossary', urbanGlossary);
app.use('/contact-me', contactMe);
app.use('/purchase-your-copy', purchaseYourCopy);
app.use('/my-media', myMedia);
app.use('/to-all-the-places-ive-had-sex-before', book);
app.use('/my-team', myTeam);
app.use('/privacy-policy', privacyPolicy);
app.use('/credits', credits);
// app.use('/us-map', mapRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
