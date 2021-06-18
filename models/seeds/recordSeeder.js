const mongoose = require('mongoose')
const Record = require('../record')
const { recordSeeds } = require('./seed.json')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
    Record.create(recordSeeds)
        .then(() => {
            console.log('record seed done!')
            db.close()
        })
        .then(() => {
            console.log('mongodb disconnected!')
        })
        .catch(err => console.log(err))
})