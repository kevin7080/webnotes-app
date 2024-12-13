/**
 * module dependencies
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
// this module creates the 'raw' http server, to which we connect the express app, see below
const favicon = require('serve-favicon');
const {engine} = require('express-handlebars');

/** 
 * our own module dependecies, like utilities, converters, language and so on
 */
// pick only the following ones, could be more available
const { normalizePort, onError, onListening} = require('./serverUtilities.js');
const serveFavicon = require('serve-favicon');
//const NoteManager = require('./NoteManager.js');
const homeRouter = require('./routes/homeRouter.js');
const loginRouter = require('./routes/loginRouter.js');

/**
 * pick out the static web content folder
 */
const publicDirectoryPath = path.join(__dirname, './public');
/**
 * create the express web part and connect the modules that is will use
 * Express is a routing and middleware web framework that has minimal functionality of its own: 
 * an Express application is essentially a series of middleware function calls
 */
const app = express();
// creates an Express web application. The express() function is a top-level function exported by the express module
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        if_eq: function(a, b, opts) {
            if(a==b) {
                return opts.fn(this);
            }

            return opts.inverse(this)
        },
        unless_eq: function(a, b, opts)  {
            if(a!=b) {
                return opts.fn(this);
            }

            return opts.inverse(this)
   }
}
}))

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev')); 
// parse application/json

app.use(express.json());
// parse application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(publicDirectoryPath));
app.use(favicon(path.join(publicDirectoryPath, './images/favicon.ico')));

// routers
// const homeRouter = require('./routes/homeRouter.js');
const notesRouter = require('./routes/notesRouter.js');
/**
 * middleware request handlers
 * they need to be in the correct order, ie the request is passed true them in the order they are defined
 * so, first the ones we define, and last the error handlers
 */

// ===================================================
// here we shall have our handlers, which we add 
// ===================================================
app.use('/', homeRouter);
app.use('/notes', notesRouter);
app.use('/login', loginRouter)

/*
// both the '/' and the '/home' routes will show the index.html page
app.get('/', (req, res) => {
    res.render('home');
    // res.sendFile(path.join(publicDirectoryPath, './index.html'));
});

app.get('/home', (req, res) => {
    res.render('home');
    // res.sendFile(path.join(publicDirectoryPath, './index.html'));
});
*/

app.get('/weather', (req, res)=>{
  res.send(
      {
          forecast: 'It is snowing',
          location: 'Vaasa'
      }
  );
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './login.html'));
});


/*app.get('/about', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, './about.html'));
  }); // this is used in case you have static pages that are not rendered by hbs*/

app.get('/about', (req, res) => {
    res.render('about');
});
/*
app.get('/notes/index', (req, res)=> {
    // we have a small file so read sync
    let allNotes = null;
    try {
        // we will make the file name a const variable later, using hardcoded here
        allNotes = new NoteManager('notes.json').getNotes();
        console.log('read the notes file.');
    } catch (error) {
        allNotes = null;
        console.log(error);
        console.error(error);
    }
    
    // here we send with a context data object with the property named 'notes', its value is the array called 'allNotes.
    res.render('notes/noteIndex', { notes:allNotes});
}); 
*/
  
app.get('/help', (req, res) => {
    res.render('help');
});

/*
app.post('/submit-form', (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password) {
      // get correct user from db and check pw
      if(username == 'novia' && password=='2025') {
          res.send('Correct username and/or password!');
          
      } else {
          res.send('Incorrect username and/or password!').end();
      }
  } else {
      res.send('Please enter username and password').end();
      
  }
});
*/

// ===================================================
// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
// error handler for everything else
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);

/**
 * this will later change to render (when we have a rendering engine)
 */

// res.send('error');
res.render('error') //changed from the above - change to the default place to view as opposed to just sending error string.
});

// ===================================================

/**
 * get port from environment and store in Express
 * set the DEBUG environment value so that the debug package shows the output
 */

 const port = normalizePort(process.env.PORT || '3000');
 app.set('port', port);
 // all object that we set on the express app is readable from the requests
 

 /**
 * create HTTP server
 */

const server = http.createServer(app);
// Here the real server is created with the express app

/**
 * listen on provided port, on all network interfaces.
 */
server.on('error', onError);
// connect the SERVER error handler not the request error handling! 
server.on('listening', onListening);
// what to call when listening, ie server up and running

server.listen(port);

// remove later
console.log('testing manager');

/*
const theNoteManager = new NoteManager('notes.json');
theNoteManager.listNotes();
theNoteManager.addNote('title1', 'body1');
theNoteManager.listNotes();
theNoteManager.addNote('title2', 'body2');
theNoteManager.listNotes();
theNoteManager.removeNote('title1');
theNoteManager.listNotes();
theNoteManager.addNote('title2', 'body2');
theNoteManager.listNotes();
theNoteManager.removeNote('void'); // do not exist
theNoteManager.removeNote('title2');
theNoteManager.listNotes();
*/