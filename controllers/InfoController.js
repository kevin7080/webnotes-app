class InfoController {
    constructor() {
    }
    
    // the route handlers will be given names according to the HTML verb and what 'page' it will handle
    // so this one will handle HTML GET and respond with the index page
    getAbout(req, res) {
        res.render('about');
    }

    getHelp(req, res) {
        res.render('help');
    }


}

module.exports = InfoController;