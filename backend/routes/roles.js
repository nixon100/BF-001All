const express = require('express');
const router = express.Router();

const {
    createRoleController,
} = require('../controller/role/create');
const {
    editRoleController,
} = require('../controller/role/edit');
const {
    getRoleController,
    getAllRolesController, // Grouped import for "get" controllers
} = require('../controller/role/get');
const {
    deleteRoleController,
} = require('../controller/role/delete');

// Define routes for roles
router.post('/', createRoleController); // Create a new role
router.put('/:id', editRoleController);      // Edit a specific role
router.get('/:id', getRoleController);       // Get a specific role
router.get('/', getAllRolesController);      // Get all roles
router.delete('/:id', deleteRoleController); // Delete a specific role

module.exports = router;
