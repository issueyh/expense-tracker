const { validationResult } = require('express-validator')
// const { takeDate } = require('../javascripts/takeDate')
module.exports = {
    handleErrorFunc: (req, res, next) => {
        const { name, category, amount } = req.body
        // const date = takeDate(req.body.date)
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).render('index', {
                createErrorMessages: errors.array(),
                record: { name, category, date, amount }
            })
        }
        next()
    }
}
