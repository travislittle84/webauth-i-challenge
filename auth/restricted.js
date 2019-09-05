const Users = require('../users/users-model.js')
const bcrypt = require('bcryptjs')

module.exports = function restricted(req, res, next) {
    const { username, password } = req.headers
    if (username && password) {
        Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: "You shall not pass!" })
            }
        })
    } else {
        res.status(400).json({ message: 'Please provide username and password' })
    }
}