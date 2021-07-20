const router = require('express').Router();
const Item = require('../../models/Item')
const validator = require('validator')


router.post('/', (req, res, next) => {

    if (!req.body) {
        res.status(400).json({ message: "Invalid request body" })
    }

    let validItems = Object.assign({}, ...Object.keys(req.body).map(objKey => {
        if (objKey === 'creator' && !validator.isMongoId(req.body[objKey])) {
            return res.status(400).json({ message: "Invalid request body" })
        }
        [objKey] = validator.escape(req.body[objKey])
    }))


    const item = new Item(validItems)

    item.save()
        .then(item => res.status(201).json(item))
        .catch(err => {
            console.log("Error saving the item", err)
            return res.status(500).json({ message: "Error saving the item" })
        })
})





module.exports = router;
