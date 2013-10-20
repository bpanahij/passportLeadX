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
