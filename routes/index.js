var request = require('request');
var _scope = require('../scope.js');

Array.prototype.random = function(){
  return this[Math.floor((Math.random()*this.length))];
}

exports.index = function(req, res, scope){
    if (req.signedCookies.access_token) {
      console.log("In signedCookies")
        var names, names_by_id = {}, genotypes;
        var base_uri = 'https://api.23andme.com/1';
        var headers = {Authorization: 'Bearer ' + req.signedCookies.access_token};
        request.get({ url: base_uri + '/names/', headers: headers, json: true }, function (e, r, body) {
            if(r.statusCode != 200) {
                res.clearCookie('access_token');
                res.redirect('/');
            } else {
                names = body;
                for (var i = 0; i < names.profiles.length; i++) {
                    names_by_id[names.profiles[i].id] = names.profiles[i].first_name + ' ' + names.profiles[i].last_name;
                }
                request.get({ url: base_uri + '/genotype/?locations=' + _scope.COMTscope, headers: headers, json: true}, function (e, r, body) {
                    genotypes = body[0];
                    var songString = ""
                    var acceptableGenotypes = ["A","C","G","T"]
                    var numbers = ["4","5","6"]
                    for(var attribute in genotypes){
                      var currentGenotype = genotypes[attribute];
                      var firstChar = currentGenotype.charAt(0);
                      var secondChar = currentGenotype.charAt(1);

                      // If the index is -1 then the character doesn't exist in the
                      // acceptable genotypes
                      if(acceptableGenotypes.indexOf(firstChar) == -1 ||
                         acceptableGenotypes.indexOf(secondChar) == -1){
                        console.error("ERROR" + firstChar + secondChar)
                      }else{
                        if(firstChar == "T")
                          firstChar = "B"
                        if(secondChar == "T")
                          secondChar = "B"
                        songString = songString + firstChar + numbers.random() + "," + secondChar + numbers.random() + ","
                      }
                    }
                    console.log(songString)
                    res.render('result', {
                        names: names_by_id,
                        genotypes: genotypes,
                        songString: songString
                    });
                });
            }
        });
    } else {
        res.render('index', {
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI
        });
    }
};

exports.receive_code = function(req, res, scope){
    if (!req.query.code) {
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
                    res.cookie('access_token', body.access_token, {signed: true});
                    res.redirect('/');
                } else {
                    res.send(body);
                }
            });
    }
};
