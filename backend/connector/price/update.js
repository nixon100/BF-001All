const Price = require('../../schema/Price');

module.exports.updatePrice = async function (id, updatedData) {
    try {
        const price = await Price.findOneAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true } // Return the updated document
        );
        return price;
    } catch (error) {
        throw new Error(error.message);
    }
};
