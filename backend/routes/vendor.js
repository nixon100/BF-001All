// routes/vendor.routes.js
const express = require('express');
const router = express.Router();
const vendorControllerRegister = require('../controller/vendor/register');
const vendorControllerGetVendor = require('../controller/vendor/getVendor');
const vendorControllerUpdate = require('../controller/vendor/updateVendor');
const vendorControllerDelete = require('../controller/vendor/deleteVendor');

// Routes
router.post('/register', vendorControllerRegister);
router.get('/', vendorControllerGetVendor);
// GET /api/vendors?username=john
// GET /api/vendors?email=john@example.com
// router.get('/:id', vendorController.getVendorById);
router.put('/:id', vendorControllerUpdate);
router.delete('/:id', vendorControllerDelete);

module.exports = router;