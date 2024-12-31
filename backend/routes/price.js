const express = require('express');
const accessControl = require('../accesscontrol');
// const priceController = require('../controller/price');
const createPrice = require('../controller/price/create');
const getAllPrices = require('../controller/price/get');
const updatePrice = require('../controller/price/update');
const deletePrice = require('../controller/price/delete');

const router = express.Router();
router.post('/prices', accessControl('create'), createPrice.createPrice); 
router.get('/prices', accessControl('get'), getAllPrices.getAllPrices); 
router.put('/prices/:id', accessControl('update'), updatePrice.updatePrice);
router.delete('/prices/:id', accessControl('delete'), deletePrice.deletePrice);

module.exports = router;
