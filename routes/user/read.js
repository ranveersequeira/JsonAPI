const router = require('express').Router();
const User = require('../../models/User')
const validator = require('validator')


router.get('/', (req, res) => {

    //validation of the query
    let validQuery = Object.assign({}, ...Object.keys(req.query).map(objKey => {
        [objKey] = validator.escape(req.query[objKey])
    }))

    const pageSize = 20;
    const currentPage = parseInt(validQuery.page) > 0 ? parseInt(validQuery.page) - 1 : 0;
    const filter = validQuery.filter || ""

    const sortBy = validQuery.sortBy || "username"
    const orderBy = validQuery.orderBy || "asc"

    const sortQuery = {
        [sortBy]: orderBy
    }
    const filterQuery = {
        username: new RegExp(filter, "i")
    }

    User.countDocuments(filterQuery)
        .then(userCount => {
            if (currentPage * pageSize > userCount) {
                return res.status(400).json([])
            }
            User.find(filterQuery)
                .limit(pageSize)
                .skip(pageSize * currentPage)
                .sort(sortQuery)
                .then(users => {
                    return res.status(200).json({
                        content: users,
                        page: validQuery.page || 1,
                        total: userCount,
                        limit: pageSize
                    })
                })
                .catch(err => {
                    console.log("Error getting users", err)
                    return res.status(500).json({ message: "Cannot find users in database" })
                })
        })

})


router.get('/:id', (req, res) => {
    const userId = validator.escape(req.params.id)
    if (!validator.isMongoId(userId)) {
        return res.status(400).json({ message: "Not a valid id" })
    }
    User.findOne({ _id: userId })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log('Error finding user by id', err)
            return res.status(500).json({ message: "Cannot find the user with given id" })
        })
})



module.exports = router;
