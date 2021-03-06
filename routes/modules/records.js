const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { handleErrorFunc } = require('../../public/javascripts/handleErrorFunc')
const { takeDate } = require('../../public/javascripts/takeDate')

router.get('/create', (req, res) => {
    return res.render('create')
})

router.post('/', [
    check('name').trim().isLength({ min: 1 }).withMessage('名稱不可為空白，請重新輸入!'),
    check('date').isISO8601().toDate().withMessage('請照格式選擇日期!'),
    check('category').trim().isLength({ min: 1 }).withMessage('請選擇支出類別'),
    check('amount').isInt({ allow_leading_zeroes: false, min: 1 }).withMessage('支出金額有誤，請重新輸入!')
], handleErrorFunc, (req, res) => {
    const { name, category, date, amount } = req.body
    Category.find({ name: category })
        .lean()
        .then(() => {
            if (!name || !category || !date || !amount) {
                return res.redirect('/records/create')
            } else {
                return Record.create({
                    name,
                    category,
                    date,
                    amount
                })
                    .then(() => res.redirect('/'))
                    .catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Promise.all([Record.findById(id).lean(), Category.find().lean()])
        .then(results => {
            const [record, categories] = results
            record.date = takeDate(record.date)
            const category = record.category
            res.render('edit', { record, category, categories })
        })
        .catch(err => console.error(err))
})

router.put('/:id', [
    check('name').trim().isLength({ min: 1 }).withMessage('名稱不可為空白，請重新輸入!'),
    check('date').isISO8601().toDate().withMessage('請照格式選擇日期!'),
    check('category').trim().isLength({ min: 1 }).withMessage('請選擇支出類別'),
    check('amount').isInt({ allow_leading_zeroes: false, min: 1 }).withMessage('支出金額有誤，請重新輸入!')
], handleErrorFunc, (req, res) => {
    const id = req.params.id
    const { name, category, date, amount } = req.body
    Category.find({ name: category })
        .lean()
        .then(() => {
            if (!name || !category || !date || !amount) {
                return res.redirect('/records/${id}/edit')
            } else {
                return Record.findById(id)
                    .then(record => {
                        record.name = name
                        record.date = date
                        record.category = category
                        record.amount = amount
                        return record.save()
                    })
                    .then(() => res.redirect('/'))
                    .catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

router.get('/filter', (req, res) => {
    const { filteredCategory } = req.query
    Promise.all([Record.find({ category: { $regex: filteredCategory } }).lean().sort('-date'), Category.find().lean()])
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
            res.render('index', { records, categories, filteredCategory, totalAmount })
        })
        .catch(err => console.log(err))
})

module.exports = router