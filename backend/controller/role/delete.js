const { deleteRole } = require('../../connector/role/delete');
const { returnResponseJson } = require('../../helper');

const deleteRoleController = async (req, res) => {
    try {
        const roleId = req.params.id;
        const deletedRole = await deleteRole(roleId);
        
        // Send the response
        res.status(200).send(returnResponseJson('Role deleted successfully', 200, deletedRole));
    } catch (error) {
        res.status(500).send(returnResponseJson(error.message, 500));
    }
};

module.exports = { deleteRoleController };
