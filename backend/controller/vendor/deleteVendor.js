const vendorService = require("../../connector/vendor/deleteVendor");
const { returnResponseJson } = require("../../utils");

// Controller with additional authorization check
module.exports.deleteVendorWithAuth = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json(returnResponseJson("Invalid vendor ID format", 400, null));
    }

    // Check if user has permission to delete
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json(
          returnResponseJson("Not authorized to delete vendors", 403, null)
        );
    }

    // Call service to delete vendor
    const response = await vendorService.softDeleteVendor(id);

    // Send response
    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Delete Vendor Error:", error);
    return res
      .status(500)
      .json(returnResponseJson("Internal Server Error", 500, null));
  }
};


