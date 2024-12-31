const mongoose = require('mongoose');

module.exports.PriceSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true
    },
   
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
