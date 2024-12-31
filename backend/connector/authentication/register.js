const mongoose = require('mongoose');
const { returnResponseJson } = require('../../utils');

const User = require("../../schema/User").UserSchema;
const UserRegister = mongoose.model("User", User);
const Role = mongoose.model("Role", require('../../schema/Role').RoleSchema);

module.exports.registerUser = async function (object) {
    try {
      // Check if email or phonenumber already exists
      const existingUser = await UserRegister.findOne({
        $or: [
          { email: object.email },
          { phonenumber: object.phonenumber },
        ],
      });
  
      if (existingUser) {
        return returnResponseJson(
          "Email or Phone number already in use",
          400,
          null
        );
      }
  
      // Fetch role data
      const roleData = await Role.findById(object.role);
      if (!roleData) {
        return returnResponseJson("Role not found", 404, null);
      }
  
      // Create new user object
      const Data = {
        username: object.username,
        email: object.email,
        password: object.password,
        phonenumber: object.phonenumber,
        role: object.role,
        internal: object.internal,
        access: roleData.access,
      };
  
      const register = new UserRegister(Data);
      return returnResponseJson("Register success", 200, await register.save());
    } catch (error) {
      console.error(error);
      return returnResponseJson("Register error", 500, null);
    }
  };
  