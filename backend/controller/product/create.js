// controller/product/createProduct.js
const { createProduct } = require('../../connector/product/create');
const { returnResponseJson } = require('../../utils');

module.exports.createProduct = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send(returnResponseJson('Product name is required', 400));
        }

        const product = await createProduct({ name });
        return res.status(201).send(returnResponseJson('Product created successfully', 201, product));
    } catch (error) {
        console.error(error);
        return res.status(500).send(returnResponseJson('Server error', 500));
    }
};
