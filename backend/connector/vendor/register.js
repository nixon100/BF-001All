const Vendorlist = require("../../schema/VendorList");
const { returnResponseJson } = require("../../utils");

const createVendor = async (obj) => {
    try {
        const { username, email, phonenumber, address } = obj;

        if (!username || !email || !phonenumber || !address) {
            return returnResponseJson("All fields are required", 400, null);
        }

        // Check if email or phone number already exists
        const existingVendor = await Vendorlist.findOne({
            $or: [{ email }, { phonenumber }]
        });

        if (existingVendor) {
            return returnResponseJson("Email or phone number already exists", 400, null);
        }

        const newVendor = new Vendorlist({
            username,
            email,
            phonenumber,
            address
        });

        const savedVendor = await newVendor.save();
        return returnResponseJson("Vendor created successfully", 201, savedVendor);

    } catch (error) {
        console.error("Error creating vendor:", error);
        return returnResponseJson(
            "An error occurred while creating the vendor", 
            500, 
            null
        );
    }
};

module.exports = {createVendor};