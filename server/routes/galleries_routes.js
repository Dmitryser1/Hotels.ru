const Router = require('express')
const router = new Router()
const GalleriesController = require('../controller/galleries_controller')
const authMiiddleware = require('../middleware/authMiddleware')


router.post('/', authMiiddleware, GalleriesController.create)
router.get('/userg', GalleriesController.getAllGalleryCarrentUser)
router.get('/', GalleriesController.getAllGallery)
router.get('/:id', GalleriesController.getAllPhoto)
router.post('/:id/update', authMiiddleware, GalleriesController.updatePhoto )



module.exports = router