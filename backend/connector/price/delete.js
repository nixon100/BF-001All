const Price = require('../../schema/Price');

module.exports.deletePrice = async function (id) {
    try {
        const price = await Price.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        return price;
    } catch (error) {
        throw new Error(error.message);
    }
};
