const mongoose = require('mongoose');
const User = require('../../schema/User').UserSchema;
const UserModel = mongoose.model('User', User);

// Get all users with role lookup
const getAllUsers = async () => {
    try {
        const users = await UserModel.aggregate([
            {
                '$lookup': {
                    'from': 'roles',
                    'localField': 'role',
                    'foreignField': '_id',
                    'as': 'results'
                }
            },
            {
                '$unwind': {
                    'path': '$results',
                    'preserveNullAndEmptyArrays': true
                }
            }
        ]);
        ;
        
        return users; // Return the list of users with their roles
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
};

// Get user by ID with role lookup
const getUserById = async (userId) => {
    try {
        const user = await UserModel.aggregate([
            [
                {
                  '$match': {
                    '_id': new ObjectId('676e4a110d4f86c3359820d6')
                  }
                }, {
                  '$lookup': {
                    'from': 'roles', 
                    'localField': 'role', 
                    'foreignField': '_id', 
                    'as': 'results'
                  }
                }, {
                  '$unwind': {
                    'path': '$results', 
                    'preserveNullAndEmptyArrays': true
                  }
                }
              ]
        ]);
        
        if (!user || user.length === 0) {
            throw new Error('User not found');
        }
        
        return user[0]; // Return the first user from the aggregation result
    } catch (error) {
        throw new Error('Error retrieving user: ' + error.message);
    }
};

module.exports = { getAllUsers, getUserById };
