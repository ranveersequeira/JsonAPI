const router = require('express').Router();
const User = require('../../models/User')


router.get('/', (req, res) => {
    //get all users
    User.find()
        .then(users => {
            return res.status(200).json(users)
        })
        .catch(err => {
            return res.status(500).json({ message: err })
            console.log(err)
        })
})


module.exports = router;
