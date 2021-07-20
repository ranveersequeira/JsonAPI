const router = require('express').Router();
const User = require('../../models/User')
const validator = require('validator')

router.post('/', (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "Missing required feild" })
    }
    const username = validator.escape(req.body.username)
    const user = new User({
        username
    })

    user.save()
        .then(user => res.status(201).json(user))
        .catch(err => {
            return res.status(500).json({ message: "Error saving the user" })
            console.log(err)
        })
})



module.exports = router;
