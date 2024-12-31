const Vendorlist = require("../../schema/VendorList");
const { returnResponseJson } = require("../../utils");

const softDeleteVendor = async (id) => {
    try {
        // Check if vendor exists
        const vendor = await Vendorlist.findById(id);

        if (!vendor) {
            return returnResponseJson("Vendor not found", 404, null);
        }

        // Check if vendor is already soft deleted
        if (vendor.softdelete) {
            return returnResponseJson("Vendor is already deleted", 400, null);
        }

        // Soft delete by updating softdelete field
        const updatedVendor = await Vendorlist.findByIdAndUpdate(
            id,
            {
                softdelete: true
            },
            { 
                new: true,  // Return the updated document
                runValidators: true  // Run schema validators
            }
        );

        return returnResponseJson(
            "Vendor deleted successfully", 
            200, 
            updatedVendor
        );

    } catch (error) {
        console.error("Error deleting vendor:", error);

        if (error.name === 'CastError') {
            return returnResponseJson(
                "Invalid vendor ID format",
                400,
                null
            );
        }

        return returnResponseJson(
            "An error occurred while deleting vendor",
            500,
            null
        );
    }
};

module.exports = {softDeleteVendor};
