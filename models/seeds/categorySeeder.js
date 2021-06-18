const db = require('../../config/mongoose')
const Category = require('../category')
const { categorySeeds } = require('./seed.json')

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