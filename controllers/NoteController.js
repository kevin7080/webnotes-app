const path = require('path');
const NoteManager = require(path.join(process.cwd(), './NoteManager.js'));

class NoteController {
    constructor() {
        this.noteManager = new NoteManager('notes.json');
    }

    getIndex = (req, res)=> {
        try {
            const allNotes = this.noteManager.loadNotes();
            
            // Set the context objects property 'notes' with 'allNotes'
            // It is the property 'notes' that the handlebar view noteIndex uses
            res.render('notes/noteIndex', {notes: allNotes});
            
        } catch (error) {
            console.log(error);
            res.render('notes/noteIndex', {notes: []});
        }
    }

    getCreate = (req, res, next) => {
        try {
            // Tell the helper that we are doing an Create => humans has selected Add
            // so the mode is 'Add'
            // and no note given => ==null
            const info = { mode: 'Add'};
            this.renderForm(res, info, null);
        } catch(error) {
            console.log(error);
            res.redirect('back');
        }
    }

    postCreate = (req, res) => {
        // Pick out the data from the form sent
        // Form send its data in the body!
        const {
            title,
            body,
        }  = req.body;
        
        if(title && body ) {  
            const storedNote = this.noteManager.addNote( title, body);
            if(storedNote)
                res.redirect('/notes/index');
            else
                res.redirect('back');
        } else {
            // There are errors with the entered values. Render the form again.
            res.redirect('back');
        }      
    }
    
    getUpdate = (req, res, next) => {
        try {
            // The :title parameter from the route : app.get('/notes/update/:title', theNoteController.getUpdate);
            // is stored in req.params. title. IE :title => title and so on
            const title = req.params.title;

            const selectedNote = this.noteManager.getNoteByTitle(title);
            if(selectedNote) {
                // Tell the helper that we are doing an Update => humans has selected Edit
                // so the mode is 'Edit'
                // and the selected note => == selectedNote
                const info = { mode: 'Edit'};
                this.renderForm(res, info, selectedNote);
            }
            else
                res.redirect('back');
        } catch(error) {
            console.log(error);
            res.redirect('back');
        }
    }

    postUpdate = (req, res) => {
        // In this specific case, with action="" in the form, it will post to the same path as the get,
        // this means that we also get the title in reg.params.title. Could be used for verify that the params and body contain the same value!
        
        // Pick out the data from the form sent
        // Form send its data in the body!
        const {
            title,
            body,
        }  = req.body;
        
        if(title && body ) {  
            const updatedNote = this.noteManager.changeNote( title, body);
            if(updatedNote)
                res.redirect('/notes/index');
            else
                res.redirect('back');
        } else {
            // There are errors with the entered values. Render the form again.
            res.redirect('back');
        }      
    }
    
    getDelete = (req, res, next) => {
        try {
            // The req ALWAY contain the unique instance app so all data that we put there is accessable
            // Here we just check that a user is inlogged and of 'type' admin. Simulated 
            if(req.app.locals.user && req.app.locals.user.username == 'admin') {
                const title = req.params.title;
                
                const selectedNote = this.noteManager.getNoteByTitle(title);
                if(selectedNote) {
                    const info = { mode: 'Remove'};
                    //Have made a separate form for removal
                    res.render('notes/notesDelete', {  mode: info.mode, title : selectedNote.title, body: selectedNote.body});
                }
                else
                    res.redirect('back');
            } else {
                res.redirect('back');
            }
        } catch(error) {
            console.log(error);
            res.redirect('back');
        }
    }

    postDelete = (req, res) => {
        // In this specific case, with action="" in the form, it will post to the same path as the get,
        // this means that we also get the title in reg.params.title. Could be used for verify that the params and body contain the same value!
        
        // The req ALWAY contain the unique instance app so all data that we put there is accessable
        // Here we just check that a user is inlogged and of 'type' admin. Simulated 
        if(req.app.locals.user && req.app.locals.user.username == 'admin') {
            
            // Pick out the data from the form sent
            // Form send its data in the body!
            const {
                title,
            }  = req.body;
            
            if(title) {  
                this.noteManager.removeNote( title);
                res.redirect('/notes/index');
            } else {
                // There are errors with the entered values. Render the form again.
                res.redirect('back');
            } 
        } else {
            // The user is not the admin
            res.redirect('back');
        }      
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // Helpers
    renderForm = (res, info, note ) => {
        if( note )
            res.render('notes/noteForm', { mode: info.mode, title: note.title, body: note.body } );
        else 
            res.render('notes/noteForm', {  mode: info.mode, title : '', body: ''});
    
        return;   
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////

}

module.exports = NoteController;