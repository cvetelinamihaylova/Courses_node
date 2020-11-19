const { validationResult } = require('express-validator');

module.exports = (req) => {
    const validationRes = validationResult(req);

    if (!validationRes.isEmpty()) {
        return {
            contextOptions: {

                ...req.body
                ,
                message: `${validationRes.array()[0].msg}`
            },
            isOk: false
        };
    }
    return { isOk: true }
};
