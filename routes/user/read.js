const router = require('express').Router();
const User = require('../../models/User')


router.get('/', (req, res) => {
    const pageSize = 20;
    const currentPage = req.query.page > 0 ? req.query.page - 1 : 0;
    const filter = req.query.filter || ""

    const sortBy = req.query.sortBy || "username"
    const orderBy = req.query.orderBy || "asc"

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
                        page: req.query.page || 1,
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
    const id = req.params.id;
    User.findOne({ _id: id })
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            console.log('Error finding user by id', err)
            return res.status(500).json({ message: "Cannot find the user with given id" })
        })
})



module.exports = router;
