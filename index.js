const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const Users = require('./users/users-model.js')



const server = express()
server.use(helmet())
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send(`Web Auth 1 Challenge - Travis Little`)
})
















const port = process.env.port || 6000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})