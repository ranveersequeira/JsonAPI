const router = require('express').Router();
const User = require('../../models/User')
const validator = require('validator')

router.put('/:id', (req, res) => {
    const userId = validator.escape(req.params.id)
    if (!validator.isMongoId(userId)) {
        return res.status(400).json({ message: "Not a valid id" })
    }

    let validBody = Object.assign({}, ...Object.keys(req.body).map(objKey => {
        [objKey] = validator.escape(req.body[objKey])
    }))

    User.findOneAndUpdate({ _id: userId }, validBody, { new: true })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log("Failed to Updated User", err)
            return res.status(500).json({ message: "Failed to Update User" })

        })

})



module.exports = router;
