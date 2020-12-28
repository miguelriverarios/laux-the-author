const createError = require('http-errors');
// const auth = require('../middleware/auth');
const express = require('express');
const exphbs = require("express-handlebars");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const index = require('../routes/index');
const yourStories = require('../routes/your-stories');
const myStory = require('../routes/my-story');
const events = require('../routes/events');
const urbanGlossary = require('../routes/urban-glossary');
const contactMe = require('../routes/contact-me');
const purchaseYourCopy = require('../routes/purchase-your-copy');
const myMedia = require('../routes/my-media');
const book = require('../routes/to-all-the-places-ive-had-sex-before');
const myTeam = require('../routes/my-team');
const privacyPolicy = require('../routes/privacy-policy');
const credits = require('../routes/credits');

const app = express();
app.use(favicon(path.join(__dirname, '../../dist/', 'favicon.ico')));

// Uncomment when launching dev site
// app.use(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure hbs engine to register handlebars helpers
app.engine("hbs", exphbs({
  defaultLayout: "main",
  partialsDir: path.join(__dirname, '../', 'views/partials/'),
  extname: ".hbs",
  helpers: require("../util/handlebarsHelpers.js").helpers
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
app.use('/your-stories', yourStories);
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
