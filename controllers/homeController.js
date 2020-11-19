const { Course } = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            const { search } = req.query;
            const query = {};
            if (search) { query.title = new RegExp(search, 'i') }
            Course
                .find(query)
                .lean()
                .then((courses) => {
                    const topCourses = courses.sort((a, b) => {
                        return b.usersEnrolled.length - a.usersEnrolled.length;
                    }).slice(0, 3);
                    courses = courses.sort((a, b) => {
                        return new Date(a.createdAt.toString()) - new Date(b.createdAt.toString())
                    });
                    res.render('./home/home.hbs', { courses, topCourses })
                })
                .catch((e) => console.log(e));
        },
    }
};
