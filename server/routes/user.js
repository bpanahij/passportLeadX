var UserModel = require('../models/UserModel')
  , crypto = require('crypto')
  , _ = require('underscore');
exports.login = function(req, res)
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
};
