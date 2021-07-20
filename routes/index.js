
const router = require('express').Router()


router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/item', require('./middleware/authorizer'))
router.use('/item', require('./item'))



module.exports = router;
