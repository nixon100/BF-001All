const express = require('express');
const accessControl = require('../accesscontrol');

// Controllers for product operations
const createProduct = require('../controller/product/create');
const getProduct = require('../controller/product/get');
const updateProduct = require('../controller/product/update');
const deleteProduct = require('../controller/product/delete');

const router = express.Router();

// Define routes with appropriate access control middleware
router.post('/products', accessControl('create'), createProduct.createProduct);
router.get('/products', accessControl('get'), getProduct.getAllProducts);
router.put('/products/:id', accessControl('update'), updateProduct.updateProduct);
router.delete('/products/:id', accessControl('delete'), deleteProduct.deleteProduct);

module.exports = router;
