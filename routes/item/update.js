const router = require('express').Router();
const Item = require('../../models/Item')
const validator = require('validator')

router.put('/:id', (req, res) => {
    const itemId = validator.escape(req.params.id)
    if (!validator.isMongoId(itemId)) {
        return res.status(400).json({ message: "Not a valid id" })
    }

    let validBody = Object.assign({}, ...Object.keys(req.body).map(objKey => {
        [objKey] = validator.escape(req.body[objKey])
    }))


    //this method need id to find, what to update,
    //extras like if you want to return the new updated user
    Item.findOneAndUpdate({ _id: itemId }, validBody, { new: true })
        .then(item => {
            return res.status(200).json(item)
        })
        .catch(err => {
            return res.status(500).json({ message: "Failed update Item" })
        })

})


module.exports = router;
