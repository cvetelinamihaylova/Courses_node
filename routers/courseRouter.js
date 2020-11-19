const { courseController } = require('../controllers');
const { isAuthNeeded, editCourseValidator, courseValidator } = require('../utils');

module.exports = (router) => {
    router.get('/create', isAuthNeeded(), courseController.get.create);
    router.get('/details/:id', isAuthNeeded(), courseController.get.details);
    router.get('/edit/:id', isAuthNeeded(), courseController.get.edit);
    router.get('/delete/:id', isAuthNeeded(), courseController.get.delete);
    router.get('/enroll/:id', isAuthNeeded(), courseController.get.enroll);

    router.post('/create', isAuthNeeded(), courseValidator, courseController.post.create);
    router.post('/edit/:id', isAuthNeeded(), editCourseValidator, courseController.post.edit);

    return router;
};