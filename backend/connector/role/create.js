const mongoose = require('mongoose')
const Role = require('../../schema/Role').RoleSchema
var createrole = mongoose.model("Role",Role)

const createRole = async (roleData) => {
    try {
        const newRole = new createrole(roleData);
        console.log(newRole,"newrole")
        await newRole.save();
        return newRole;
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
};

module.exports = { createRole };
