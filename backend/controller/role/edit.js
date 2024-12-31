const { editRole } = require('../../connector/role/edit');
const { returnResponseJson } = require('../../helper');

const editRoleController = async (req, res) => {
    try {
        const roleId = req.params.id;
        const roleData = req.body;
        const updatedRole = await editRole(roleId, roleData);
        console.log(updatedRole, "updated");
        
        // Send the response
        res.status(200).send(returnResponseJson('Role updated successfully', 200, updatedRole));
    } catch (error) {
        res.status(500).send(returnResponseJson(error.message, 500));
    }
};

module.exports = { editRoleController };
