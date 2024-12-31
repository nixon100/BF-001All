var express = require('express');
var router = express.Router();
var controllerRegister = require("../controller/authentication/register")
var controllerLogin = require("../controller/authentication/login")
var controllerGetAll = require("../controller/authentication/getuser")
var controllerGetById = require("../controller/authentication/getuser")


router.post('/register', controllerRegister.registerUser);

router.post('/login', controllerLogin.userlogin);

router.get('/users', controllerGetAll.getAllUsersController);

router.get('/users/:userId', controllerGetById.getUserByIdController);

module.exports = router;
