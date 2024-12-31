const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    softdelete: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// Create the model from the schema
const Vendorlist = mongoose.model('Vendorlist', vendorSchema);

// Export the model
module.exports = Vendorlist;