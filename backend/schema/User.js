const mongoose = require('mongoose');

module.exports.UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, // Define role as ObjectId
        ref: 'Role', // Reference the Role collection or model
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    internal: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
