const mongoose = require('mongoose');
const Role = require('../../schema/Role').RoleSchema;

const editRole = async (roleId, roleData) => {
    try {
        const RoleModel = mongoose.model('Role', Role);
        const updatedRole = await RoleModel.findByIdAndUpdate(roleId, roleData, { new: true });
        return updatedRole;
    } catch (error) {
        throw new Error('Error editing role: ' + error.message);
    }
};

module.exports = { editRole };
