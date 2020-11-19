const { homeController } = require('../controllers');
const { isAuthNeeded } = require('../utils');

module.exports = (router) => {
    router.get('/', homeController.get.home);
    return router;
};
