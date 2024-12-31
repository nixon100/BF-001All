const { getRole, getAllRoles } = require('../../connector/role/get');
const { returnResponseJson } = require('../../helper');

const getRoleController = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await getRole(roleId);
        
        // Send the response
        res.status(200).send(returnResponseJson('Role retrieved successfully', 200, role));
    } catch (error) {
        res.status(500).send(returnResponseJson(error.message, 500));
    }
};

const getAllRolesController = async (req, res) => {
    try {
        const roles = await getAllRoles();
        
        // Send the response
        res.status(200).send(returnResponseJson('Roles retrieved successfully', 200, roles));
    } catch (error) {
        res.status(500).send(returnResponseJson(error.message, 500));
    }
};

module.exports = { getRoleController, getAllRolesController };
