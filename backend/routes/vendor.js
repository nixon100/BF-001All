// routes/vendor.routes.js
const express = require('express');
const router = express.Router();
const {registerVendor} = require('../controller/vendor/register');
const {getAllVendors} = require('../controller/vendor/getVendor');
const {updateVendor} = require('../controller/vendor/updateVendor');
const {deleteVendorWithAuth} = require('../controller/vendor/deleteVendor');

// Routes
router.post('/register', registerVendor);
router.get('/', getAllVendors);
// GET /api/vendors?username=john
// GET /api/vendors?email=john@example.com
// router.get('/:id', vendorController.getVendorById);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendorWithAuth);

module.exports = router;