const { createRole } = require('../../connector/role/create');
const { returnResponseJson } = require('../../helper');

const createRoleController = async (req, res) => {
    try {
        const roleData = req.body;
        console.log(roleData, "roledata");
        
        // Validate role data here (if needed)

        const newRole = await createRole(roleData);
        
        // Send the response
        res.status(201).send(returnResponseJson('Role created successfully', 201, newRole));
    } catch (error) {
        res.status(500).send(returnResponseJson(error.message, 500));
    }
};

module.exports = { createRoleController };
