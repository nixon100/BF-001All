const priceConnector = require('../../connector/price/delete');

module.exports.deletePrice = async function (req, res) {
    try {
        const id = req.params.id;

        const deletedPrice = await priceConnector.deletePrice(id);

        if (!deletedPrice) {
            return res.status(404).send({ msg: 'Price not found or already deleted' });
        }

        res.status(200).send({ msg: 'Price deleted successfully', data: deletedPrice });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Error deleting price' });
    }
};
