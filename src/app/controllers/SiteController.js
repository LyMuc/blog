const Course = require('../models/Course');

class SiteController {
    // [GET] /
    async index(req, res) {
        //res.render('home');
        try {
            const data = await Course.find({});
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // [GET] /:slug
    show(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
