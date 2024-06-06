require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const sequelize = require('./db')
const models = require('./models/models.js')
const fileUpload = require('express-fileupload')
//const pool = require('./db')
const cors = require('cors')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}
start()

/*
app.use(cors())
app.use(express.json())
//Create User

app.post('/client', async(req,res) => {
    const {name, characteristic, profilePhoto ,password, email} = req.body
    const newClient = await pool.query('INSERT INTO client (name, characteristic, profilePhoto ,password, email) VALUES ($1,$2,$3,$4,$5) RETURNING * ',[name, characteristic, profilePhoto ,password, email])
    res.json(newClient.rows)
})
app.get('/client', async(req,res) => {
    const client = await pool.query ('SELECT * FROM client')
})
app.get('/client/:id', async(req,res) => {
    const clientId=req.params.id
    const client = await pool.query ('SELECT * FROM client where clientId=$1',[clientId])
    res.json(client.rows)
})
app.put('/client', async(req,res) => {
    const {clientId, name, characteristic, profilePhoto ,password, email} = req.body
    const newClient = await pool.query
        ('UPDATE client set name=$1, characteristic=$2, profilePhoto=$3 ,password=$4, email=$5 where id=$6) RETURNING * ',
        [name, characteristic, profilePhoto ,password, email, clientId])
    res.json(newClient.rows)
})
app.delete('/client/:id', async(req,res) => {
    const clientId=req.params.id
    const client = await pool.query ('DELETE FROM client where clientId=$1',[clientId])
    res.json(client.rows)
})
*/


//app.listen(PORT, () => console.log("server started on port", {PORT}))