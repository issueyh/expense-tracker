const mongoose = require('mongoose')
const Category = require('../category')
const { categorySeeds } = require('./seed.json')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

db.once('open', () => {
    Category.create(categorySeeds)
        .then(() => {
            console.log('category seed done!')
            db.close()
        })
        .then(() => {
            console.log('mongodb disconnected!')
        })
        .catch(err => console.log(err))
})