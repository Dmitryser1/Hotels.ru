const Router = require('express')
const router = new Router()
const complaintsController = require("../controller/complaints_controller.js")
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/', authMiddleware, complaintsController.create)
router.get('/', complaintsController.getAll)
router.post('/:id/update', complaintsController.updateStatus)
router.delete('/delete', complaintsController.del)


module.exports = router