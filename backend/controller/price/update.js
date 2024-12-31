const priceConnector = require('../../connector/price/update');

module.exports.updatePrice = async function (req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedPrice = await priceConnector.updatePrice(id, updatedData);

        if (!updatedPrice) {
            return res.status(404).send({ msg: 'Price not found or already deleted' });
        }

        res.status(200).send({ msg: 'Price updated successfully', data: updatedPrice });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error updating price' });
    }
};
