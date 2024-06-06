const { Sequelize } = require('sequelize')
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

/*
const Pool=require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "qwerty",
    host: "localhost",
    port: 5432,
    database: "imgdb"
})

module.exports = pool
*/