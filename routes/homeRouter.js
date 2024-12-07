const path= require('path');
const express = require('express');
const homeRouter = express.Router();

const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const HomeController = require(path.join(controllersDirectoryPath, './HomeController'));

const theHomeController = new HomeController();

// GET methods
// we connect all the options for 'normal' routing with /, /home and /index
homeRouter.get('/', theHomeController.getIndex);
homeRouter.get('/home', theHomeController.getIndex);
homeRouter.get('/index', theHomeController.getIndex);

module.exports = homeRouter;