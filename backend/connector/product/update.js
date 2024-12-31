// connector/product/updateProduct.js
const Product = require('../../schema/Product');

module.exports.updateProduct = async function (id, data) {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: id, isDeleted: false },
            data,
            { new: true }
        );
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};
