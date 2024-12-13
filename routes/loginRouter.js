const path= require('path');
const express = require('express')
const loginRouter = express.Router()

const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const LoginController = require(path.join(controllersDirectoryPath, './LoginController'));

const theLoginController = new LoginController();

// GET methods
loginRouter.get('/', theLoginController.getLogin);

// POST methods
loginRouter.post('/submit-login-form', theLoginController.postLogin);

module.exports = loginRouter;