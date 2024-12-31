const { hashPassword, generateToken } = require('../../helper');
const userRegister = require('../../connector/authentication/register');
const { returnResponseJson } = require('../../utils');
module.exports.registerUser = async function (req, res) {
  try {
    req.body.password = await hashPassword(req.body.password);
    const response = await userRegister.registerUser(req.body);

    if (response.status === 200) {
      const payload = {
        user: {
          id: response.data._id,
          role: response.data.role,
          access: response.data.access,
        },
      };

      const token = await generateToken(payload);
      return res.status(200).send({ message: response.msg, token });
    }

    res.status(response.status).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send(returnResponseJson('Server Error', 500));
  }
};
