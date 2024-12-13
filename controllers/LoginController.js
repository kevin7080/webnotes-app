class LoginController {
    // this is logical functionality 'login'.
    // but we need two physical actions, one for the GET request and one for the POST request !
    getLogin = (req, res) => {
        res.render('login');
    }

    postLogin = (req, res) => {
        const {
            username, password
        } = req.body;

/* the const above can still be written as 
        const username = req.body.username
        const password = req.body.password */

        if (username == 'novia' && password == "2023") {
            // handlebars can also get the context from app.locals so setting it here so it remembers the values
            res.app.locals.user = {username}; 
            res.app.locals.loginStatus = '';
        } else if(username == "admin" && password == "aivon") {    
            // Handlebars can also get the context from app.locals so setting it here so it remembers the values
            res.app.locals.user = {username}; 
            res.app.locals.loginStatus = '';
        }
         else {
            // Handlebars can also get the context from app.locals so setting it here so it remembers the values
            res.app.locals.user = null;
            res.app.locals.loginStatus = 'Wrong user name or password';
        }   

        res.redirect('/home');
    }
}

module.exports = LoginController;