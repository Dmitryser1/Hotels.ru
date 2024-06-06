const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware.js')
const CommentsController = require('../controller/comments_controller.js')

router.post('/', authMiddleware ,CommentsController.create)
router.get('/:id', authMiddleware, CommentsController.getAll )


module.exports = router