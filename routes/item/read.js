const router = require('express').Router();
const Item = require('../../models/Item')
const validator = require('validator')

router.get('/', (req, res) => {

    let validQuery = Object.assign({}, ...Object.keys(req.query).map(objKey => {
        [objKey] = validator.escape(req.query[objKey])
    }))
    const pageSize = 20;
    const currentPage = validQuery.page > 0 ? validQuery.page - 1 : 0;
    const filter = validQuery.filter || ""
    const filterOn = validQuery.filterOn || ""
    const sortBy = validQuery.sortBy || "createdAt"
    const orderBy = validQuery.orderBy || "asc"

    const sortQuery = {
        [sortBy]: orderBy
    }
    let filterQuery = {}
    if (filter.length > 0) {
        const regex = new RegExp(filter, 'i')
        if (filterOn.length > 0) {
            filterQuery = {
                [filterOn]: regex
            }
        } else {
            filterQuery = {
                content: regex
            }
        }
    }

    Item.countDocuments(filterQuery)
        .then(itemCount => {
            if (currentPage * pageSize > itemCount) {
                return res.status(400).json([])
            }
            Item.find(filterQuery)
                .limit(pageSize)
                .skip(currentPage * pageSize)
                .sort(sortQuery)
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
    const itemId = validator.escape(req.params.id)
    if (!validator.isMongoId(itemId)) {
        return res.status(400).json({ message: "Not a valid id" })
    }

    Item.findOne({ _id: itemId })
        .then(item => {
            return res.status(200).json(item)
        })
        .catch(err => {
            console.log('Error finding user by id', err)
            return res.status(500).json({ message: "Cannot find the item with given id" })
        })
})



module.exports = router;
