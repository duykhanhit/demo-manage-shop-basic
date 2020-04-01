const mongoose = require('mongoose');

const productSchema  = new mongoose.Schema({
    name: String,
    url: String,
    descriptions: String,
    keyword: String,
    inCategory: String,
    total: String,
    price: String,
    promotion: String,
    createdBy: String,
    thumb: String
});

let Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;