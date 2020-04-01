const crCate_md = require('../models/category_model');
const crProduct_md = require('../models/product_model');
const user_md = require('../models/user.model');
const extension_md = require('../models/extension_model');


module.exports.dashboard = function(req, res){
    res.render('dashboard/index');
}

module.exports.createProduct = async function(req, res) {
    let listCategory = await crCate_md.find();

    res.render('dashboard/createProduct', {data: {listName: listCategory}});
}

module.exports.createCategory = function(req, res){
    res.render('dashboard/createCategory', {data: {}});
}
module.exports.postCreateCategory = async function(req, res){
    let data = req.body;

    if(!data.title){
        res.render('dashboard/createCategory', {data : {error: 'Chưa nhập tên thương hiệu'}});
        return;
    }

    let url = extension_md.formatURL(data.title);
    let keyword = extension_md.formatKeyword(data.keyword);

    let newCate = new crCate_md(
        {
            name: data.title,
            url: url,
            descriptions: data.desc,
            keyword: keyword
        }
    );

    await newCate.save();

    res.render('dashboard/createCategory', {data: {success: 'Thành công!'}});
}

module.exports.postCreateProduct = async function(req, res){
    let data = req.body;

    let listCategory = await crCate_md.find();

    let users = await user_md.find();
    let account = users.find(function(user){
        return user._id == req.signedCookies.UID;
    });

    let errors =[];

    if(!data.title){
        errors.push('Chưa nhập tên sản phẩm');
    }
    if(!data.price || parseInt(data.price) < 0) {
        errors.push('Chưa nhập giá');
    }
    if(!data.promotion){
        data.promotion = 0;
    }

    if(errors.length){
        res.render('dashboard/createProduct', {data: {
            error: errors,
            listName: listCategory
        }});
        return;
    }
    if(data.thumb){
        data.thumb = req.file.path.split('/').slice(1).join('/');
    }else{
        data.thumb = '/images/default.jpg';
    }

    let url = extension_md.formatURL(data.title);
    let keyword = extension_md.formatKeyword(data.keyword);

    let newProduct = new crProduct_md(
        {
            name: data.title,
            url: url,
            descriptions: data.desc,
            keyword: keyword,
            inCategory: data.category,
            total: data.total,
            price: data.price,
            promotion: data.promotion,
            createdBy: account.username,
            thumb: data.thumb
        }
    );

    await newProduct.save();

    res.render('dashboard/createProduct', {data: {
        success: 'Thêm thành công.',
        listName: listCategory
    }});
}

module.exports.productManagement = async function(req, res){
    let listProduct = await crProduct_md.find();


    res.render('dashboard/productManagement', {data: {listProduct: listProduct}});
}

module.exports.editProduct = async function(req, res){
    let id = req.params.id;

    let listProduct = await crProduct_md.find();
    let listCategory = await crCate_md.find();

    let product = listProduct.find(function(item){
        return item._id == id;
    });

    if(product){
        res.render('dashboard/editProduct', {data: {
            data: null,
            product: product,
            listName: listCategory
        }});
    }else{
        res.render('dashboard/editProduct', {data: {
            data: null,
            error: 'Không thể lấy dữ liệu bài viết',
            listName: listCategory,
            status_code: 0
        }});
    }
}

module.exports.updateProduct = async function(req, res){
    let params = req.body.data;
    let id = req.params.id;

    await crProduct_md.findByIdAndUpdate(id, params);
    
    res.json({ status_code: 200 });
}

module.exports.deleteProduct = async function(req, res){
    let id = req.body.id;

    await crProduct_md.findByIdAndDelete(id);
    
    res.json({ status_code: 200 });
}