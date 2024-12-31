const { comparePassword, generateToken } = require('../../helper');
const userConnector = require('../../connector/authentication/login');
const { returnResponseJson } = require('../../utils');

module.exports.userlogin = async function (req, res) {
  try {
    if (!req.body.email) {
      return res.status(400).send(returnResponseJson('Email required', 400));
    }

    if (!req.body.password) {
      return res.status(400).send(returnResponseJson('Password required', 400));
    }

    const response = await userConnector.userlogin(req.body);

    console.log(response,"response")

    if (response.status === 200) {
      const isPasswordValid = await comparePassword(req.body.password, response.data.password);

      if (!isPasswordValid) {
        return res.status(400).send(returnResponseJson('Invalid password', 400));
      }

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
