const mongoose = require('mongoose');
const Role = require('../../schema/Role').RoleSchema;

const getRole = async (roleId) => {
    try {
        const RoleModel = mongoose.model('Role', Role);
        const role = await RoleModel.findById(roleId);
        return role;
    } catch (error) {
        throw new Error('Error retrieving role: ' + error.message);
    }
};

const getAllRoles = async () => {
    try {
        const RoleModel = mongoose.model('Role', Role);
        const roles = await RoleModel.find({ isDeleted: false });
        return roles;
    } catch (error) {
        throw new Error('Error retrieving roles: ' + error.message);
    }
};

module.exports = { getRole, getAllRoles };
