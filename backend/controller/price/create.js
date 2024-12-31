const priceConnector = require('../../connector/price/create');

module.exports.createPrice = async function (req, res) {
    try {
        const priceData = req.body;

        const createdPrice = await priceConnector.createPrice(priceData);

        res.status(201).send({ msg: 'Price created successfully', data: createdPrice });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error creating price' });
    }
};
