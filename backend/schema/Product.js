const mongoose = require('mongoose');

module.exports.ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
