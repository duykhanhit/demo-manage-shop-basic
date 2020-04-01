const mongoose = require('mongoose');

const categorySchema  = new mongoose.Schema({
    name: String,
    url: String,
    descriptions: String,
	keyword: String
});

let Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;