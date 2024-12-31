const priceConnector = require('../../connector/price/get');

module.exports.getAllPrices = async function (req, res) {
    try {
        const prices = await priceConnector.getAllPrices();

        if (!prices || prices.length === 0) {
            return res.status(404).send({ msg: 'No prices found' });
        }

        res.status(200).send({ msg: 'Prices retrieved successfully', data: prices });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error retrieving prices' });
    }
};
