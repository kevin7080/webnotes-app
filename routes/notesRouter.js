const path= require('path');
const express = require('express')
const notesRouter = express.Router()

const controllersDirectoryPath = path.join(process.cwd(), './controllers');
const NoteController = require(path.join(controllersDirectoryPath, './NoteController'));

const theNoteController = new NoteController();

// GET Methods /////////////////////////////////////
notesRouter.get('/index', theNoteController.getIndex);
// This route fetch the form to fill in
notesRouter.get('/create', theNoteController.getCreate)
// This route fecth the form with the selected title to edit
notesRouter.get('/update/:title', theNoteController.getUpdate)

// POST Methods /////////////////////////////////////
// This route sends back the form to the server
notesRouter.post('/create', theNoteController.postCreate);
// This route send back the form with the selected title to to the server
notesRouter.post('/update/:title', theNoteController.postUpdate)

module.exports = notesRouter;