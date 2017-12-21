/**
 * index.js
 * Main route file that handles the authentication and also parsing
 * the API response for the Tone.js font end script
 */
var request = require('request');
var _scope = require('../scope.js');

var acceptableGenotypes = ["C","A"]
var numbers = ["4","5"]
var base_uri = 'https://api.23andme.com/1';

/**
 * Method that takes a previously determined code and turns it in
 * for an authentication token and if valid then renders the results
 * page with the DNA genotypes
 */
exports.index = function(req, res, scope){
  // If there isnt a code stored then render the normal index page
  if(!req.signedCookies.access_token){
    res.render('index', {
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI
    });
  }
  // If a cookie exists then hit the api for a token then for the genotypes

  // The authorization header with the access token from the cookie which is needed
  // for api requests
  var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};

  // Use a Promise async function to turn the code in for a token
  var token = getToken(headers);
  token.then(function(names) {
    requestGenotypes(res, headers, names)
  }).catch(function(e) {
    // If the token auth fails then redirect to root and clear the cookie
    res.clearCookie('access_token');
    res.redirect('/');
  });

};

function requestGenotypes(res, headers, names){
  // After the Promise returns then request the genotypes
  var genotypes = getGenotypes(headers);
  genotypes.then(function(result) {
    // Parse the genotypes and format the song string
    var songString = parseGenotypes(result)
    // Finally render the result page and pass in the songString
    res.render('result', {
      names: names,
      genotypes: result,
      songString: songString
    });
  }).catch(function(e){
    console.error(e)
    res.clearCookie('access_token');
    res.redirect('/');
  });
}
/**
 * Method that takes a code and queries the 23andMe api for a token
 */
function getToken(headers){
  var names, names_by_id = {}, genotypes;
  var options = {
    url: base_uri + '/names/', // appends names to global variable base_uri
    headers: headers,          // Headers contains the authentication codes
    json: true
  };
  // Return new promise
  return new Promise(function(resolve, reject) {
    // Do async job
    request.get(options, function (e, r, body) {
      if(r.statusCode != 200) {
        // If a non valid status code then reject the Promise
        reject('Error validating token');
      } else {
        names = body;
        for (var i = 0; i < names.profiles.length; i++)
        {
          names_by_id[names.profiles[i].id] = names.profiles[i].first_name + ' ' + names.profiles[i].last_name;
        }
        resolve(names_by_id);
      }
    });
  })
}

/**
 * Method that queries the 23andMe api for the rsIds and renders the results page
 */
function getGenotypes(headers){
  var requestParams = {
    url: base_uri + '/genotype/?locations=' + _scope.COMTscope,
    headers: headers,
    json: true
  };
  return new Promise(function(resolve, reject) {
    request.get(requestParams, function (e, r, body) {
      if(e) reject(e);
      resolve(body[0])
    });
  })
}

/**
 * Method that parses an array of genotypes into a string which can be fed into
 * the Tone.js library on the frontend
 */
var parseGenotypes = function(genotypes){
  var songString = ""
  // Convert the object to an array
  var g = Object.keys(genotypes).map(function(k) { return genotypes[k] });
  // Clean the array of anything other than A,C,G,T and convert T's to B's
  g = g.clean();
  for(var i = 0; i < g.length; i++){
    songString = songString + g[i] + numbers.random() + ","
  }
  // Return the compiled song string
  return songString;
}

/**
 * Method that takes in the Authorization code from 23andMe
 * and stores it as a cookie
 */
exports.receive_code = function(req, res, scope){
    if (!req.query.code) {
        // if the query doesn't return a code then render the error page
        res.render('error', {
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI
        });
    } else {
        // Exchange the code for a token,
        // store it in the session, and redirect.
        request.post({
            url: 'https://api.23andme.com/token/',
            form: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: process.env.REDIRECT_URI,
                scope: scope
            },
            json: true }, function(e, r, body) {
                if (!e && r.statusCode == 200) {
                    // Store the access code
                    res.cookie('access_token', body.access_token, {signed: true});
                    // redirect to the index page which will now render the
                    // results page because the cookie is set
                    res.redirect('/');
                } else {
                    res.send(body);
                }
            });
    }
};

// Array prototype that returns a random element
Array.prototype.random = function(){
  return this[Math.floor((Math.random()*this.length))];
}
// Array prototype that removes duplicates
Array.prototype.removeDuplicates = function(){
  let unique = [];
  for(let i = 0; i < this.length; i++){
    if(unique.indexOf(this[i]) == -1)
      unique.push(this[i])
  }
  return unique
}

Array.prototype.clean = function(){
  let clean = [];
  for(let i = 0; i < this.length; i++){
    if(this[i] == "AA" || this[i] == "CC" || this[i] == "GG")
    {
      clean.push(this[i].charAt(0))
      clean.push(this[i].charAt(1))
    }

    if(this[i] == "TT")
    {
      clean.push("B")
      clean.push("B")
    }

  }
  return clean
}
