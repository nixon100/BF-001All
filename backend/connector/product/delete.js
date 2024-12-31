// connector/product/deleteProduct.js
const Product = require('../../schema/Product');

module.exports.deleteProduct = async function (id) {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};
