/**
 * Ark routes that look up public user information on the web
 * @type {request|exports|*}
 */
var request = require('request')
  , _ = require('underscore')
  , async = require('async')
  , natural = require('natural')
  , config = require('../../config');

module.exports = function(app)
{
  app.get('/ark/:email', function(req, res)
  {
    var email = req.params.email;
    var fields = JSON.parse(req.query.fields);
    arkify(email, fields, function(err, data)
    {
      res.json(data);
    });
  });
}
var arkify = function(email, fields, callback)
{
  request(
    {
      url: 'https://testapi.ark.com/email/' + email,
      headers: {
        api_token: config.arkAPIKey
      }
    },
    function(err, response, body)
    {
      var data = JSON.parse(body);
      console.log(data);
      var funcArray = [];
      _.each(data.links, function(link)
      {
        funcArray.push(function(callback)
        {
          linkFunction(fields, link, callback);
        });
      });
      async.parallel(funcArray, function(err, resp)
      {
        callback(null, resp);
      })
    });
};
var linkFunction = function(fields, link, callback)
{
  request(
    {
      url: 'https://testapi.ark.com/network/' + link.network_id + ':' + link.profile_id,
      headers: {
        api_token: config.arkAPIKey
      }
    },
    function(err, response, body)
    {
      var profile;
      try
      {
        profile = JSON.parse(body);
      }
      catch(e)
      {
        callback('error');
        return;
      }
      delete profile.links;
      var fieldFound = {};
      scan(null, profile, function(key, value)
      {
        _.each(fields, function(keywords)
        {
          _.each(keywords, function(keyword)
          {
            if (natural.LevenshteinDistance(key, keyword) < 1)
            {
              fieldFound[keyword] = value;
            }
            else
            {
            }
          });
        });
      });
      callback(null, fieldFound);
    });
}
var scan = function(k, obj, call)
{
  var k;
  if (obj instanceof Object)
  {
    for(k in obj)
    {
      if (obj.hasOwnProperty(k))
      {
        scan(k, obj[k], call);
      }
    }
  }
  else
  {
    call(k, obj);
  }
};
/**
 * "{\"message\":\"unknown profile.\"}"
 "{\"name\":\"Brian Johnson\",\"languages\":[],\"pics\":[\"//lh3.googleusercontent.com/-GUFWTtYkpVA/AAAAAAAAAAI/AAAAAAAAACA/UmBrTNNcoBM/photo.jpg\"],\"emails\":[],\"links\":[{\"name\":\"Google+\",\"link\":\"https://plus.google.com/118240164487818358893\"}],\"education\":[{\"school\":\"University of Texas at Austin\",\"major\":null,\"from\":null,\"to\":\"2000\",\"src\":\"gp/118240164487818358893\"}],\"work\":[{\"company\":\"rateGenius.com\",\"position\":\"Senior Web Developer\",\"from\":null,\"to\":null,\"src\":\"gp/118240164487818358893\"}],\"interests\":{},\"location\":\"Austin, Texas\"}"
 "{\"message\":\"unknown profile.\"}"
 "{\"name\":\"BrianJohnson\",\"sex\":\"male\",\"location\":\"Austin, Texas\",\"pics\":[\"http://graph.facebook.com/bpanahij/picture?type=large\"],\"links\":[{\"link\":\"https://www.facebook.com/bpanahij\",\"network_name\":\"Facebook\",\"profile_url\":\"https://www.facebook.com/bpanahij\",\"network_id\":\"fb\",\"profile_id\":\"bpanahij\"},{\"link\":\"https://www.facebook.com/bpanahij\",\"network_name\":\"Facebook\",\"profile_url\":\"https://www.facebook.com/bpanahij\",\"network_id\":\"fb\",\"profile_id\":\"bpanahij\"}]}"
 */
/**
 "links": [
 {
     "email": "brian@pjohnson.info",
 "network_id": "tw",
 "network_name": "Twitter",
 "profile_id": "code_brian",
 "profile_url": "http://twitter.com/code_brian"
 },
 {
     "email": "brian@pjohnson.info",
 "network_id": "fb",
 "network_name": "Facebook",
 "profile_id": "bpanahij",
 "profile_url": "http://www.facebook.com/bpanahij"
 },
 {
     "email": "brian@pjohnson.info",
 "network_id": "li",
 "network_name": "LinkedIn",
 "profile_id": "brpjohnson",
 "profile_url": "http://www.linkedin.com/in/brpjohnson"
 },
 {
     "email": "brian@pjohnson.info",
 "network_id": "gp",
 "network_name": "Google+",
 "profile_id": "118240164487818358893",
 "profile_url": "https://plus.google.com/118240164487818358893"
 }
 ],
 */
