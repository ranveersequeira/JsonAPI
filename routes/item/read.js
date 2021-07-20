const router = require('express').Router();
const Item = require('../../models/Item')

router.get('/', (req, res) => {
    const pageSize = 20;
    const currentPage = req.query.page > 0 ? req.query.page - 1 : 0;

    Item.count()
        .then(itemCount => {
            if (currentPage * pageSize > itemCount) {
                return res.status(400).json([])
            }
            Item.find()
                .limit(pageSize)
                .skip(currentPage * pageSize)
                .sort({
                    createAt: -1
                })
                .then(items => {
                    return res.status(200).json({
                        content: items,
                        page: req.query.page || 1,
                        total: itemCount,
                        limit: pageSize
                    })
                })
                .catch(err => {
                    console.log('Error getting all the users', err)
                    return res.status(500).json({ message: "No item in the database" })
                })
        })


})


router.get('/:id', (req, res) => {
    const id = req.params.id;
    Item.findOne({ _id: id })
        .then(item => {
            return res.status(200).json(item)
        })
        .catch(err => {
            console.log('Error finding user by id', err)
            return res.status(500).json({ message: "Cannot find the item with given id" })
        })
})



module.exports = router;
