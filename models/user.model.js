var mongoose = require('mongoose');

var userSchema  = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
	password: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;