const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const restricted = require('./auth/restricted.js')
const bcrypt = require('bcryptjs')
const Users = require('./users/users-model.js')



const server = express()
server.use(helmet())
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send(`Web Auth 1 Challenge - Travis Little`)
})


server.get('/api/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting users from server"})
        })
})

server.post('/api/register', (req, res) => {
    let user = req.body
    user.password = bcrypt.hashSync(user.password, 14)
    Users.add(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: "Could not register"})
        })
})

server.post('/api/login', (req, res) => {
    const { username, password } = req.body
    Users.findBy(username)
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!`})
            } else {
                res.status(401).json({ message: "Invalid credentials" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Could not login"})
        })
    
})













const port = process.env.port || 6000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})