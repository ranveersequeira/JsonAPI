const router = require('express').Router()
const passport = require('passport')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const validator = require('validator')
const secretKey = process.env.secretKey || "Please set secret in prod"


const Authenticate = User.authenticate()



router.post('/', (req, res, next) => {

    const username = validator.escape(req.body.username)
    const password = validator.escape(req.body.password)


    User.register(new User({
        username,
    }), password)
        .then(user => {
            return Authenticate(username, password)
        })
        .then(authUser => {
            if (!authUser.user) {
                return res.status(403).json({ msg: "Invalid username or password" })
            }
            return signJwt = new Promise((resolve, reject) => {

                jwt.sign({
                    id: authUser.user._id,
                    username: authUser.user.username
                }, secretKey, {
                    expiresIn: '48h'
                }, (err, result) => {
                    if (err) {
                        return reject()
                    } else {
                        return resolve(result)
                    }
                })
            })
                .then(userJwt => {
                    let expiresDate = new Date()
                    expiresDate = new Date(expiresDate.setHours(expiresDate.getHours() + 48))
                    const cookieOption = {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production' ? true : false,
                        expires: expiresDate
                    }
                    res.cookie("Authorization", userJwt, cookieOption)
                    return authUser.user.save()
                })
                .catch(err => {
                    throw new Error(err)
                })
        })
        .then(savedUser => {
            return res.status(201).json({
                user: {
                    id: savedUser._id,
                    username: savedUser.username
                },
                isAuthenticated: true
            })
        })
        .catch(err => {
            console.log("Error Creating User", err)
            return res.status(500).json({ msg: "Error Creating User" })
        })



})



module.exports = router;
