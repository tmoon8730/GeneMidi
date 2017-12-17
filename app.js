const express = require('express')
const app = express()
const request = require('request')
var bodyParser = require('body-parser')
var path = require('path')

const credentials = {
  client: {
    id: 'd1c385794e09e6bf92ce9bbad4fc09a0',
    secret: '7ebe66e00d0408a5fa37459cfabcf497'
  },
  auth: {
    tokenHost: 'https://api.23andme.com',
    authorizePath: '/authorize',
    tokenPath: '/token'
  }
};

/*var oauth2 = require('simple-oauth2')({
  clientId: 'd1c385794e09e6bf92ce9bbad4fc09a0',
  clientSecret: '7ebe66e00d0408a5fa37459cfabcf497',
  site: 'https://api.23andme.com',
  tokenPath: '/token',
  authorizationPath: '/authorize'
});*/

const oauth2 = require('simple-oauth2').create(credentials);

var authorization_uri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/receive_code/',
  scope: 'basic  rs737866'
});

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/auth', function (req, res) {
  res.redirect(authorization_uri);
});

app.get('/receive_code', function(req,res){
  var code = req.query.code;
  if(!code){
    res.send('Error no code sent')
  }else {
    console.log('running')
    oauth2.authorizationCode.getToken({
      code: code,
      redirect_uri: 'http://localhost:300/receive_code/'
    }, saveToken);

    function saveToken(error, result) {
      console.log(result)
      if (error) {
        console.log('Access Token Error', error.message);
      } else {
        token = oauth2.accessToken.create(result);
        console.log(token);
      }
    };

    res.sendFile(path.join(__dirname+'/genetic_data.html'))
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => console.log("App listening on port 3000!"))
