const path= require('path');
const express = require('express');
const infoRouter = express.Router();
const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const InfoController = require(path.join(controllersDirectoryPath, './InfoController'));

const theInfoController = new InfoController

//get methods
infoRouter.get('/about', theInfoController.getAbout)
infoRouter.get('/help', theInfoController.getHelp)


module.exports = infoRouter;