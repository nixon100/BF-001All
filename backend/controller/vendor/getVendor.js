const vendorService = require('../../connector/vendor/getVendor');
const { returnResponseJson } = require('../../utils');

module.exports.getAllVendors = async (req, res) => {
    try {
        // Get query parameters if any
        const query = {};

        // Add any filters based on query parameters
        if (req.query.username) {
            query.username = { $regex: req.query.username, $options: 'i' };
        }
        if (req.query.email) {
            query.email = { $regex: req.query.email, $options: 'i' };
        }

        // Get the response from the connector
        const response = await vendorService.getAllVendors(query);

        // Send response with appropriate status code
        return res.status(response.status).json(response);

    } catch (error) {
        console.error('Get All Vendors Error:', error);
        return res.status(500).json(
            returnResponseJson('Internal Server Error', 500, null)
        );
    }
};

