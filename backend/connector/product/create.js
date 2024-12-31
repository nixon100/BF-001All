const { default: mongoose } = require('mongoose');

// connector/product/createProduct.js
const Product = require('../../schema/Product').ProductSchema;
const createproduct = mongoose.model("Product",Product)

module.exports.createProduct = async function (data) {
    try {
        const product = new createproduct(data);
        const savedProduct = await product.save();
        return savedProduct;
    } catch (error) {
        throw new Error(error.message);
    }
};
