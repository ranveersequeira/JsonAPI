const router = require('express').Router();
const Item = require('../../models/Item')
const validator = require('validator')


router.delete('/:id', (req, res) => {
    const itemId = validator.escape(req.params.id)
    if (!validator.isMongoId(itemId)) {
        return res.status(400).json({ message: "Not a valid id" })
    }

    Item.findByIdAndDelete(itemId)
        .then(item => {
            console.log("deleting user..", item)
            return res.status(204).json({ message: "Successfully Deleted" })
        })
        .catch(err => {
            console.log("Error in deleting item", err)
            return res.status(500).json({ message: "Error deleting item" })
        })

})




module.exports = router;
