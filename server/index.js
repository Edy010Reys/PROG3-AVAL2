const sqlite = require('sqlite3')

const database = new sqlite.Database('./data/eleicoes2022pi.db', (error) => {
    if (error) {
        console.log(error.message)
    }
})

module.exports = {database}