const router = require('express').Router();
const User = require('../../models/User')

router.put('/:id', (req, res) => {
    const id = req.params.id;

    User.findOneAndUpdate({ _id: id }, req.body, { new: true })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(500).json({ message: "Failed to Update User" })
            console.log(err)
        })

})



module.exports = router;
