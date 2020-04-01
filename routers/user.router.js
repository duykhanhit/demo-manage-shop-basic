const express = require('express');

const contronller = require('../controllers/user.controller');

const router = express.Router();

router.get('/register', contronller.register);
router.get('/login', contronller.login);
router.get('/logout', contronller.logout);

router.post('/register', contronller.postRegister);
router.post('/login', contronller.postLogin);

module.exports = router;