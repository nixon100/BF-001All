const Vendorlist = require("../../schema/VendorList");
const { returnResponseJson } = require("../../utils");

const getAllVendors = async (query = {}) => {
    try {
        // Get all vendors with optional filtering
        const vendors = await Vendorlist.find(query)
            // .select('-__v') // Exclude version key
            // .sort({ createdAt: -1 }); // Sort by creation date, newest first

        if (!vendors || vendors.length === 0) {
            return returnResponseJson("No vendors found", 404, []);
        }

        return returnResponseJson("Vendors retrieved successfully", 200, vendors);

    } catch (error) {
        console.error("Error fetching vendors:", error);
        return returnResponseJson(
            "An error occurred while fetching vendors",
            500,
            null
        );
    }
};

module.exports = {getAllVendors};