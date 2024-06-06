const {Comments} = require('../models/models.js')


class CommentsController{
    async create(req, res, next){
        try{
            const {text, galleryId} = req.body
            let UserId = req.user.id
            //let UserId = '1'
            const Comment = await Comments.create({text, galleryId, UserId})
            return res.json(Comment)
        } catch(e){
            next(ApiError.badRequest("Something wrong"))
        }
        
    }

    async getAll(req, res){
        try{
        const {galleryId} = req.query
        console.log(galleryId)
        let Comment = await Comments.findAll({where: {galleryId}})
        return res.json(Comment)
            } catch(e){
                next(ApiError.badRequest("Something wrong"))
            }
    }

}

module.exports = new CommentsController()