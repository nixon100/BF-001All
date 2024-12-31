// controller/product/updateProduct.js
const { updateProduct } = require('../../connector/product/update');
const { returnResponseJson } = require('../../utils');

module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).send(returnResponseJson('Product name is required', 400));
        }

        const product = await updateProduct(id, { name });

        if (!product) {
            return res.status(404).send(returnResponseJson('Product not found', 404));
        }

        return res.status(200).send(returnResponseJson('Product updated successfully', 200, product));
    } catch (error) {
        console.error(error);
        return res.status(500).send(returnResponseJson('Server error', 500));
    }
};
