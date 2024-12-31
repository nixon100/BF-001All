const { getAllUsers,  } = require('../../connector/authentication/getuser');
const { getUserById } = require('../../connector/authentication/getuser'); // Adjust the path based on your folder structure

// Controller for getting all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller for getting a particular user by ID
const getUserByIdController = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a route parameter
    try {
        const user = await getUserById(userId);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllUsersController, getUserByIdController };

