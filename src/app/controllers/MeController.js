const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /stored/courses
    storedCourses(req, res, next) {
    
        Course.find( {
        $or: [
            { deleted: null },
            { deleted: false }
        ]
    })
            .then((courses) => {
                courses = multipleMongooseToObject(courses);
                res.render('me/stored-courses', { courses });
            })
            .catch(next);
    }

    // [GET] /trash/courses
    trashCourses(req, res, next) {
        Course.find({ deleted: true})
            .then((courses) => {
                courses = multipleMongooseToObject(courses);
                res.render('me/trash-courses', { courses });
            })
            .catch(next);
    }
}


module.exports = new MeController();
