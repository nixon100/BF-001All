const mongoose = require('mongoose');

module.exports.RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    access: {
        type: Object,
        required: true,
    },
    internal: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
