var UserModel = require('../models/UserModel')
  , crypto = require('crypto')
  , _ = require('underscore');
module.exports = function(app)
{
  /**
   * Save a user
   */
  app.post('/user/:userId', function(req, res)
  {
    UserModel.findOneAndUpdate(req.body, function(err, user)
    {
      user.save(function(err)
      {
        if (err) console.log(err);
        res.json(user);
      });
    });
  });
  /**
   * Create a user
   */
  app.post('/user', function(req, res)
  {
    var user = new UserModel(req.body);
    user.save(function(err)
    {
      if (err) console.log(err);
      res.json(user);
    });
  });
  /**
   * Get one user by id
   */
  app.get('/user/:userId', function(req, res)
  {
    UserModel.findById(req.params.userId, function(err, user) {
      if (err) console.log(err);
      res.json(user);
    });
  });
  /**
   * Login endpoint
   */
  app.get('/login/:userName/:password', function(req, res)
  {
    if (_.isUndefined(req.body.userName))
    {
      res.send({});
      return;
    }
    UserModel.login(req.body,
      function(err, match, user)
      {
        if (match)
        {
          crypto.pbkdf2(user.password,
            'passport lead-x',
            2,
            10,
            function(err, token)
            {
              token = token.toString('hex');
              req.session.username = user.username;
              req.session.token = token;
              user.token = token;
              user.save(function(err, savedUser)
              {
                res.json({
                    fullName: savedUser.fullName,
                    username: savedUser.username,
                    email: savedUser.email,
                    _id: savedUser._id,
                    unitId: savedUser.unitId,
                    userPerms: savedUser.userPerms
                  }
                );
              });
            });
        }
        else
        {
          res.json({});
        }
      });
  });
}
