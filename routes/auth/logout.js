const router = require('express').Router()
const User = require('../../models/User')
const Blacklist = require('../../models/BlackList')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const secretKey = process.env.secretKey || "Please set secret in prod"

router.post('/logout', (req, res, next) => {
    if (!req.headers.cookies && !req.headers.cookie) {
        return res.status(401).json({ User: " Unauthorized" })
    }

    const userJwt = cookie.parse(req.headers.cookies || req.headers.cookie).Authorization
    const decodedJwt = new Promise((resolve, reject) => {
        jwt.verify(userJwt, secretKey, {}, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result)
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
                        return res.status(401).json({ msg: "token already blacklisted" })
                    }
                    return Blacklist.create({
                        userId: plainToken.id,
                        token: userJwt
                    })
                })
                .then(blacklistedToken => {
                    res.clearCookie("Authorization")
                    return res.status(205).json({})
                })
                .catch(err => {
                    console.log("Error ", err)
                    res.status(400).json({ msg: "Bad Request" })
                })
        })

})


module.exports = router
