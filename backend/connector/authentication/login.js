const mongoose = require('mongoose');
const { returnResponseJson } = require('../../utils');

const User = require('../../schema/User').UserSchema;
const Role = mongoose.model('Role', require('../../schema/Role').RoleSchema);
const UserRegister = mongoose.model('User', User);

module.exports.userlogin = async function (value) {
  try {
    const user = await UserRegister.findOne({ email: value.email });

    if (!user) {
      return returnResponseJson('User not found', 400);
    }

    const roleData = await Role.findById(user.role);

    if (!roleData) {
      return returnResponseJson('Role not found', 400);
    }

    return returnResponseJson('Login successful', 200, {
      ...user.toObject(),
      access: roleData.access,
    });
  } catch (error) {
    console.error(error);
    return returnResponseJson('Login error', 500);
  }
};
