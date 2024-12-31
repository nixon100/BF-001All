const mongoose = require('mongoose');
const Role = require('../../schema/Role').RoleSchema;

const deleteRole = async (roleId) => {
    try {
        const RoleModel = mongoose.model('Role', Role);
        const updatedRole = await RoleModel.findByIdAndUpdate(roleId, { isDeleted: true }, { new: true });
        return updatedRole;
    } catch (error) {
        throw new Error('Error deleting role: ' + error.message);
    }
};

module.exports = { deleteRole };
