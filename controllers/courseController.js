const { Course } = require('../models');
const { formValidator } = require('../utils');

module.exports = {
    get: {

        create(req, res, next) {
            res.render('./courses/create.hbs');
        },

        details(req, res, next) {

            Course
                .findOne({ _id: req.params.id })
                .lean()
                .then((course) => {
                    let isCreator = false;
                    let isEnrolled = course.usersEnrolled.find(id => id.toString() == req.user._id.toString())
                    if (course.creator.toString() == req.user._id.toString()) {
                        isCreator = true;
                    }
                    res.render('./courses/details.hbs', { ...course, isCreator, isEnrolled });
                })
        },

        edit(req, res, next) {

            Course
                .findOne({ _id: req.params.id })
                .then((course) => {
                    res.render('./courses/edit.hbs', course);
                });
        },

        delete(req, res, next) {

            Course
                .deleteOne({ _id: req.params.id })
                .then((result) => {
                    res.redirect('/home');
                })
        },
        enroll(req, res, next) {
            const { id } = req.params;
        
            Course
                .updateOne(
                    { _id: id },
                    { $push: {usersEnrolled : req.user._id } }
                ).then(() => {
                    res.redirect(`/courses/details/${id}`)
                })
        }

    },

    post: {
        create(req, res, next) {
            const validationErrors = formValidator(req);
            if (!validationErrors.isOk) {
                res.render('./courses/create.hbs', validationErrors.contextOptions);
                return;
            }
            let today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            Course
                .create({ ...req.body, creator: req.user._id, createdAt: `${date} ${time}` })
                .then((course) => {
                    res.redirect('/home');
                });
        },

        edit(req, res, next) {
            const { id } = req.params;
            const validationErrors = formValidator(req);
            if (!validationErrors.isOk) {
                res.render('./courses/edit.hbs', validationErrors.contextOptions);
                return;
            }


            Course
                .updateOne(
                    { _id: id },
                    { $set: { ...req.body } }
                ).then(() => {
                    res.redirect(`/courses/details/${id}`)
                })
        }
    }
}