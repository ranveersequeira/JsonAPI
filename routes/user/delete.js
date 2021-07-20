const router = require('express').Router();
const User = require('../../models/User')

router.delete('/:id', (req, res) => {
    const userId = validator.escape(req.params.id)
    if (!validator.isMongoId(userId)) {
        return res.status(400).json({ message: "Not a valid id" })
    }

    User.findByIdAndDelete(userId)
        .then(user => {
            console.log("deleting user..", user)
            return res.status(204).json({ message: "Successfully Deleted" })
        })
        .catch(err => {
            console.log("Error in deleting user", err)
            return res.status(500).json({ message: "Error deleting user" })
        })

})



module.exports = router;
