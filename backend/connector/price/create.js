const { default: mongoose } = require('mongoose');

const Price = require('../../schema/Price').PriceSchema;
const createprice = mongoose.model("Price",Price)

module.exports.createPrice = async function (priceData) {
    try {
        const newPrice = new createprice(priceData);
        const savedPrice = await newPrice.save();
        return savedPrice;
    } catch (error) {
        throw new Error(error.message);
    }
};
