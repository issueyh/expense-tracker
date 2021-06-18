const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { takeDate } = require('../../public/javascripts/takeDate')

router.get('/', (req, res) => {
    Promise.all([Record.find().lean(), Category.find().lean()])
        .then(results => {
            const [records, categories] = results
            let totalAmount = records.reduce((sum, record) => sum += record.amount, 0)
            records.forEach(record => {
                categories.find(category => {
                    if (category.name === record.category) {
                        record.icon = category.icon
                        record.date = takeDate(record.date)
                    }
                })
            })
            res.render('index', {records, categories, totalAmount})
        })
        .catch(err => console.log(err))
})

module.exports = router