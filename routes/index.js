const router = require('express').Router()



router.use('/user', require('./user'))
router.use('/item', require('./item'))



module.exports = router;
