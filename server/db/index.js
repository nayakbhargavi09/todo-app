const { Pool } = require('pg')
const { postgres } = require('../config/config')

const pool = new Pool({
    user: postgres.user,
    host: postgres.host,
    database: postgres.database,
    password: postgres.password
})

const checkDBConn = async () => {
    return new Promise((resolve, reject) => {
        try {
            pool.connect().then(() => {
                resolve('connected')
                console.log('connected')
            })
        } catch (err) {
            console.log(err)
            reject('db connection failed')
        }
    })
}

const query = (text) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(text, (error, elements) => {
                if (error) {
                    return reject(error)
                }
                return resolve(elements)
            })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    checkDBConn,
    query
}