const router = require('express').Router()
const passport = require('passport')
const User = require('../../models/User')
const Blacklist = require('../../models/BlackList')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const validator = require('validator')
const secretKey = process.env.secretKey || "Please set secret in prod"


const Authenticate = User.authenticate()

// api/auth/local/signup
router.use((req, res, next) => {
    if (!req.headers.cookies && !req.headers.cookie) {
        return res.status(401).json({
            user: 'Unauthorized',
            isAuthenticated: false
        })
    }
    if (req.user) {
        return next()
    }
    const userJwt = cookie.parse(req.headers.cookies || req.headers.cookie).Authorization
    if (!userJwt) {
        return res.status(401).json({ msg: 'Unauthorized' })
    }
    const decodedJwt = new Promise((resolve, reject) => {
        jwt.verify(userJwt, secretKey, {}, (err, decoded) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(decoded)
            }
        })
    })
        .then(plainToken => {
            Blacklist.find({
                userId: plainToken.id,
                token: userJwt
            })
                .then(results => {
                    if (results.length > 0) {
                        return res.status(401).json({ msg: 'Unauthorized' })
                    }
                    return User.findOne({
                        _id: plainToken.id
                    })
                })
                .then(user => {
                    req.user = user
                    return next()
                })
                .catch(err => {
                    console.log('err checking token', err)
                    return res.status(400).json({ msg: 'bad request' })
                })
        })
})

module.exports = router
