// controller/product/deleteProduct.js
const { deleteProduct } = require('../../connector/product/delete');
const { returnResponseJson } = require('../../utils');

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await deleteProduct(id);

        if (!product) {
            return res.status(404).send(returnResponseJson('Product not found', 404));
        }

        return res.status(200).send(returnResponseJson('Product deleted successfully', 200));
    } catch (error) {
        console.error(error);
        return res.status(500).send(returnResponseJson('Server error', 500));
    }
};
