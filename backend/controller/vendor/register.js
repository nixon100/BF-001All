const vendorService = require('../../connector/vendor/register');
const { returnResponseJson } = require('../../utils');

module.exports.registerVendor = async (req, res) => {
    try {
        // Check if request body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json(
                returnResponseJson('Request body cannot be empty', 400, null)
            );
        }

        // Call the connector function
        const response = await vendorService.createVendor(req.body);

        // Send response
        return res.status(response.status).json(response);

    } catch (error) {
        console.error('Vendor Registration Error:', error);
        return res.status(500).json(
            returnResponseJson('Internal Server Error', 500, null)
        );
    }
};

// module exports = registerVendor;