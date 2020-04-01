const user_md = require('../models/user.model');

module.exports.requireAuth = async function(req, res, next) {
    if (!req.signedCookies.UID) {
      res.redirect('/user/login');
      return;
    }
  
    let users = await user_md.find();

    let account = users.find(function(user){
        return user._id == req.signedCookies.UID;
    });
  
    if (!account) {
      res.redirect('/user/login');
      return;
    }
  
    res.locals.account = account;
  
    next();
  };

// module.exports.getCookies = function(req, res){
//   const cookies = req.signedCookies.UID;
//   return cookies;
// }