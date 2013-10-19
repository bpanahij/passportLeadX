/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./server/routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , config = require('./config');
var userRoutes = require('./server/routes/user');
mongoose.connect('mongodb://localhost/tiro');
var app = express();
app.use(express.bodyParser());
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('.jade', require('jade').__express);
app.engine('.html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.cookieSession({secret: 'Passport Lead X', cookie: {path: '/', httpOnly: false, maxAge: null}}));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/client' }));
app.use(express.static(path.join(__dirname, '/client')));
//app.all ('*', auth ());
app.get('/', routes.index);
//API endpoints
userRoutes(app);
http.createServer(app).listen(app.get('port'), function()
{
  console.log('Express server listening on port ' + app.get('port'));
});
