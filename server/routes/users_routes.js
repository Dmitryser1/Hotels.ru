const Router = require('express')
const router = new Router()
const userController = require('../controller/user_controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/gallery', authMiddleware, userController.GetUserInfo)
router.get('/', userController.getAll)
router.post('/photo',authMiddleware, userController.UpdatePhoto)

module.exports = router
