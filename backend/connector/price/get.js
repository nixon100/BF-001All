const Price = require('../../schema/Price');

module.exports.getAllPrices = async function () {
    try {
        const prices = await Price.find({ isDeleted: false });
        return prices;
    } catch (error) {
        throw new Error(error.message);
    }
};
