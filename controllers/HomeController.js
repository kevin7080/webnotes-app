class HomeController {
    constructor() {
    }
    
    // the route handlers will be given names according to the HTML verb and what 'page' it will handle
    // so this one will handle HTML GET and respond with the index page
    getIndex(req, res) {
        res.render('home');
    }
}

module.exports = HomeController;