const express = require('express');
const usersController = require('../controllers/usersController');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/register', usersController.create);
router.get('/user', usersController.getUsers);
router.post('/customer/checkout', salesController.createSale);
router.get('/customer/checkout', salesController.listSales);
router.get('/customer/checkout/:id', salesController.getSaleById);
router.get('/customer/products', productsController.list);
router.get('/user/:email', usersController.getByEmail);
router.post('/admin/manage', usersController.create);

module.exports = router;
