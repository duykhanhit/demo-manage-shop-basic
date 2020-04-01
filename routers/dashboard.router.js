const express = require('express');
var multer  = require('multer');
var upload = multer({ dest: './public/images' });


const contronller = require('../controllers/dashboard.controller');

const router = express.Router();

router.get('/', contronller.dashboard);
router.get('/create-product', contronller.createProduct);
router.get('/create-category', contronller.createCategory);
router.get('/product-management', contronller.productManagement);
router.get('/product-management/edit/:id', contronller.editProduct);

router.post('/create-category', contronller.postCreateCategory);
router.post('/create-product', upload.single('thumb'), contronller.postCreateProduct);

router.put('/product-management/edit/:id', upload.single('thumb'), contronller.updateProduct);

router.delete('/product-management/delete/', contronller.deleteProduct);

module.exports = router;