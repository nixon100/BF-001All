const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('./connector/authentication/register');
const { returnResponseJson } = require('./utils');

// Helper function to create JSON response
module.exports.returnResponseJson = returnResponseJson;

// Helper function to verify JWT token
module.exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECERT_KEY);
    const user = await userController.getuserdata(decoded.user.id);

    if (!user || user.status === 400) {
      return null;
    }

    return user.data;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Helper function to generate JWT token
module.exports.generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECERT_KEY,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

// Helper function to hash a password
module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Helper function to compare a password
module.exports.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
