const { default: mongoose } = require('mongoose');

// connector/product/createProduct.js
const Product = require('../../schema/Product').ProductSchema;
const createproduct = mongoose.model("Product",Product)

module.exports.getAllProducts = async function () {
    try {
        const products = await createproduct.find({ isDeleted: false }); // Fetch all non-deleted products
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
};
