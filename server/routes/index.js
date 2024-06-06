const Router = require('express')
const router = new Router()

const comments_routes = require('./comments_routes')
const complaints_routes = require('./complaints_routes')
const galleries_routes = require('./galleries_routes')
const photos_routes = require('./photos_routes')
const types_routes = require('./types_routes')
const users_routes = require('./users_routes')


router.use('/users', users_routes)
router.use('/types', types_routes)
router.use('/galleries', galleries_routes)
router.use('/photos', photos_routes)
router.use('/complaints', complaints_routes)
router.use('/comments', comments_routes)

module.exports = router