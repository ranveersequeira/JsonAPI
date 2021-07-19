const router = require('express').Router();
const Item = require('../../models/Item')


router.post('/', (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: "Missing required feild" })
    }

    const item = new Item(req.body)

    item.save()
        .then(item => res.status(201).json(item))
        .catch(err => {
            return res.status(500).json({ message: "Error saving the item" })
            console.log(err)
        })
})





module.exports = router;
