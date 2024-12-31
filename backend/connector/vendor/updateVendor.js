const Vendorlist = require("../../schema/VendorList");
const { returnResponseJson } = require("../../utils");

module.exports.updateVendor = async (id, updateData) => {
    try {
        // Check if vendor exists
        const existingVendor = await Vendorlist.findById(id);
        if (!existingVendor) {
            return returnResponseJson("Vendor not found", 404, null);
        }

        // Check if email or phone is being updated and if it already exists
        if (updateData.email || updateData.phonenumber) {
            const duplicateCheck = await Vendorlist.findOne({
                _id: { $ne: id }, // exclude current vendor
                $or: [
                    { email: updateData.email || '' },
                    { phonenumber: updateData.phonenumber || '' }
                ]
            });

            if (duplicateCheck) {
                return returnResponseJson(
                    "Email or phone number already exists",
                    400,
                    null
                );
            }
        }

        // Update vendor
        const updatedVendor = await Vendorlist.findByIdAndUpdate(
            id,
            {
                $set: {
                    username: updateData.username?.trim(),
                    email: updateData.email?.toLowerCase().trim(),
                    phonenumber: updateData.phonenumber?.trim(),
                    address: updateData.address?.trim()
                }
            },
            { new: true, runValidators: true }
        );

        return returnResponseJson(
            "Vendor updated successfully",
            200,
            updatedVendor
        );

    } catch (error) {
        console.error("Error updating vendor:", error);
        if (error.name === 'ValidationError') {
            return returnResponseJson(
                "Invalid input data",
                400,
                null
            );
        }
        return returnResponseJson(
            "An error occurred while updating vendor",
            500,
            null
        );
    }
};

