const user_md = require('../models/user.model');

const md5 = require('md5');


module.exports.register = function(req, res) {
    res.render('user/register', {data: {}});
}

module.exports.postRegister = async function(req, res) {
    var user = req.body;
    var errors = [];

    if(!user.username) {
        errors.push('Chưa nhập username');
    }
    if(user.email.trim().length === 0) {
        errors.push('Chưa nhập email');
    }
    if(user.phoneNumber.trim().length === 0) {
        errors.push('Chưa nhập số điện thoại');
    }
    if(user.password.trim().length === 0) {
        errors.push('Chưa nhập password');
    }
    if(user.repassword !== user.password) {
        errors.push('Mật khẩu không khớp');
    }

    if(errors.length) {
        res.render('user/register', {data : {error: errors}});
        return;
    }

    var hashedPassword = md5(user.password);

    const newUser = new user_md(
        {
            username: user.username,
            email: user.email,
            phone: user.phoneNumber,
            password: hashedPassword
        }
    );
    await newUser.save();

    res.redirect('/user/login');
}

module.exports.login = function(req, res){
    res.render('user/login', {data: {}});
}

module.exports.postLogin = async function(req, res){
    let getUser = req.body;
    let errors = [];
    
    let users = await user_md.find();

    let account = users.find(function(user){
        return user.username === getUser.username;
    });

    if(!account){
        errors.push('Không tồn tại tài khoản');
        res.render('user/login', {data : {error: errors}});
        return;
    }

    let hashedPassword = md5(getUser.password);

    if(account.password !== hashedPassword){
        errors.push('Sai mật khẩu');
        res.render('user/login', {data : {error: errors}});
        return;
    }

    res.cookie('UID', account._id, 
        {
            expires: new Date(Date.now() + 86400000), 
            httpOnly: true,
            signed: true
        }
    );
    res.redirect('/dashboard');

}

module.exports.logout = function(req, res) {
    res.clearCookie('UID');
    return res.status(200).redirect('/user/login');
}