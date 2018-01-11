/**
 * app.js
 * Main express server configuration file
 */
var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var _scope  = require('./scope.js');

var app = express();

/**
 * Express Server Configuration
 */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static(path.join(__dirname, 'public')));
app.set('scope', _scope.COMTscope);

/**
 * Routes
 */
app.get('/', function(res, req) {
    routes.index(res, req, app.get('scope'));
});
app.get('/logout', function(res, req) {
  routes.logout(res, req)
});
app.get('/receive_code/', function(res, req) {
    routes.receive_code(res, req, app.get('scope'));
});


/**
 * Create the server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
})
