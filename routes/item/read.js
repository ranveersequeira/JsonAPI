const router = require('express').Router();
const Item = require('../../models/Item')

router.get('/', (req, res) => {
    //get all items
    Item.find()
        .then(items => {
            return res.status(200).json(items)
        })
        .catch(err => {
            return res.status(500).json({ message: err })
            console.log(err)
        })
})




module.exports = router;
