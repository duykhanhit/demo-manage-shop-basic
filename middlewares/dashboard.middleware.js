const user_md = require('../models/user.model');

module.exports.requireAuth = function(req, res, next) {
  
    // let users = await user_md.find();

    // let account = users.find(function(user){
    //     return user._id == req.signedCookies.UID;
    // });
    if (UID) {
      res.redirect('/dashboard');
    }else{
        next();
    }

  };