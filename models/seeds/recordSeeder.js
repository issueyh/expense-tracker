const db = require('../../config/mongoose')
const Record = require('../record')
const { recordSeeds } = require('./seed.json')

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