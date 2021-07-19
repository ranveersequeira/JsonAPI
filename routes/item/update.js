const router = require('express').Router();
const Item = require('../../models/Item')

router.put('/:id', (req, res) => {
    const id = req.params.id;

    //this method need id to find, what to update,
    //extras like if you want to return the new updated user
    Item.findOneAndUpdate({ _id: id }, req.body, { new: true })
        .then(item => {
            return res.status(200).json(item)
        })
        .catch(err => {
            return res.status(500).json({ message: "Failed update Item" })
        })

})


module.exports = router;
