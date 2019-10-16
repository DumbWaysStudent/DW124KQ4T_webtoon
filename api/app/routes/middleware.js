const jwt = require('express-jwt')
const env = require('../../env')

module.exports = {
    auth: jwt({secret: env.jwt.secret})
}