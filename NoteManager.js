const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

class NoteManager 
{
    // const noteManager = new NoteManager('./json');
    // const noteManager = new NoteManager();
    constructor(storagePathName)
    {
        // In this exercis we set the full path to storage/notes.json if path not given 
        // THIS IS USING AS ROOT PATH THE SAME FOLDER WHERE THIS FILE IS!
        // IT IS NOT A GOOD SOLUTION IN THE LONG RUN. NODE.js requires you to set the root path your self if you like to have a global one.
        // When we start to use a database we will replace this with the database connection!
        if(storagePathName==null) {
            this.storagePathName = path.join(__dirname, 'notes.json');
            fs.writeFileSync(this.storagePathName,'');
            console.log(chalk.blueBright.inverse('Storage file created'));
        }
        else
            this.storagePathName = path.join(__dirname,storagePathName);
            this.notes = this.loadNotes();
    }
    
    loadNotes() {
        try {
            const dataBuffer = fs.readFileSync(this.storagePathName);
            const dataJSON = dataBuffer.toString()
            console.log(chalk.blueBright.inverse('All notes loaded'));
            return JSON.parse(dataJSON)
        } catch (e) {
            console.log(chalk.blueBright.inverse('Empty notes loaded'));
            return []
        }
    }
    
    listNotes() {
        console.log(chalk.green.inverse('Your notes'));
        if(this.notes.length == 0)
            console.log(chalk.blueBright.inverse('No notes in the storage'));
        else {
            this.notes.forEach((note) => {
                console.log(chalk.blackBright(note.title + ':'+note.body))
            });
        }
    }

    addNote(title, body) {
        const duplicateNote = this.notes.find((note) => note.title === title)

        if (!duplicateNote) {
            const newNote = {
                title: title, // or shorter just title
                body: body // or shorter just body
            };

            this.notes.push(newNote);
            console.log(chalk.green.inverse('New note added!'));
            this.saveNotes();
            return newNote; // <-- Changed, return the new note
            
        } else {
            console.log(chalk.red.inverse('Note title taken!'))
            return null;  // <-- Changed, return null if note already exists
        }
    }

    changeNote(title, body) {
        const noteToChange = this.notes.find((note) => note.title === title)

        if (noteToChange) {
            
            // We do not need to change the title, it shall stay the same
            noteToChange.body = body;
            console.log(chalk.green.inverse('Note changed!'));
            this.saveNotes();
            return noteToChange;
            
        } else {
            console.log(chalk.red.inverse('Note to change not found!'))
            return null;
        }
    }
    
    removeNote(title) {
        const notesToKeep = this.notes.filter((note) => note.title !== title)

        if (this.notes.length > notesToKeep.length) {
            console.log(chalk.green.inverse('Note removed!'))
            this.notes = notesToKeep;
            this.saveNotes()
        } else {
            console.log(chalk.red.inverse(`No note found with title = ${title} !`))
        }    
    }

    getNotes() {
        console.log(chalk.green.inverse('Get all notes'));
        return this.notes;
    }
    
    getNoteByTitle(title) {
        const note = this.notes.find((note) => note.title === title)

        if (note) {
            console.log(chalk.blackBright(note.title + ':'+note.body));
        } else {
            console.log(chalk.red.inverse(`Note not found with title =${title} !`))
        }

        return note;
    }

    saveNotes() {
        const dataJSON = JSON.stringify(this.notes)
        fs.writeFileSync(this.storagePathName, dataJSON);
        console.log(chalk.blueBright.inverse('All notes saved'));
    }
}   

module.exports = NoteManager;