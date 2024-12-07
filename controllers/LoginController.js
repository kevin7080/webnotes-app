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

        if (username && username == 'novia' && password == "2023") {
            // handlebars can also get the context from app.locals so setting it here so it remembers the values
            res.app.locals.user = {username};
            res.app.locals.loginStatus = '';
        } else {
            // handlebars can also get the context from app.locals so setting it here so it remembers the values
            res.app.locals.user = null;
            res.app.locals.loginStatus = "Wrong username or password";
        }

        res.redirect('home');
    } 
}

module.exports = LoginController;