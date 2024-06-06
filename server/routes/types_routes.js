const Router = require('express')
const router = new Router()
const TypesController = require('../controller/types_controller')


router.get('/', TypesController.getAll )


module.exports = router
