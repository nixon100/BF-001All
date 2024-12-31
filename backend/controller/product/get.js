const productConnector = require('../../connector/product/get');
const { returnResponseJson } = require('../../helper');

module.exports.getAllProducts = async function (req, res) {
    try {
        const products = await productConnector.getAllProducts();

        if (!products || products.length === 0) {
            return res.status(404).send(returnResponseJson('No products found', 404));
        }

        return res.status(200).send(returnResponseJson('Products retrieved successfully', 200, products));
    } catch (error) {
        console.error(error);
        return res.status(500).send(returnResponseJson('Server Error', 500));
    }
};
