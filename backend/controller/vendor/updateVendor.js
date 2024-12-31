const vendorService = require('../../connector/vendor/updateVendor');
const { returnResponseJson } = require('../../utils');

const updateVendor = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json(
                returnResponseJson("Invalid vendor ID", 400, null)
            );
        }

        // Validate request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json(
                returnResponseJson("Update data cannot be empty", 400, null)
            );
        }

        // Extract update data
        const updateData = {
            username: req.body.username,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: req.body.address
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(
            key => updateData[key] === undefined && delete updateData[key]
        );

        // Call service to update vendor
        const response = await vendorService.updateVendor(id, updateData);

        return res.status(response.status).json(response);

    } catch (error) {
        console.error('Update Vendor Error:', error);
        return res.status(500).json(
            returnResponseJson('Internal Server Error', 500, null)
        );
    }
};

module.exports = {updateVendor};