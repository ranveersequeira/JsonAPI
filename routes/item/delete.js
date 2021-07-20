const router = require('express').Router();
const Item = require('../../models/Item')


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Item.findByIdAndDelete(id)
        .then(item => {
            console.log("deleting user..", item)
            return res.status(204).json({ message: "Succefully Deleted" })
        })
        .catch(err => {
            console.log("Error in deleting item", err)
            return res.status(500).json({ message: "Error deleting item" })
        })

})




module.exports = router;
