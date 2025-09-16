const Course = require('../models/Course');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        const imageID = req.body.videoID.split('?')[0];
        formData.image = `https://img.youtube.com/vi/${imageID}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
        .then((savedCourse) => res.redirect(`/courses/${savedCourse.slug}`))
        .catch(next);
    }

    // [GET] /courses/:id/update
    update(req, res, next) {
        Course.findById({_id: req.params.id})
            .then((course) => {
                course = mongooseToObject(course);
                res.render('courses/edit', { course });
            })
            .catch(next);
    }
    
    // [PUT] /courses/:id
    edit(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => 
                res.redirect('/me/stored/courses')
            )
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('/me/trash/courses'))
        .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
        .then(() => res.redirect('/me/trash/courses'))
        .catch(next);
    }

    // [POST] /courses/handle-action
    handleAction(req, res, next) {
        switch (req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.coursesID}})
                .then(() => res.redirect('/me/stored/courses'))
                .catch(next);
            break;
            default: 
                res.json({message: 'Action is invalid!'});
        }
    }
}
module.exports = new CourseController();
