const {Photo} = require('../models/models.js')
const ApiError = require('../error/ApiError.js')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');


class PhotosController{

    async getAll(req, res){
        const {} = req.query
        let photo = await Photo.findAndCountAll()
        return res.json(photo)
    }

    async del(req, res, next) { //Удаление самой галереи
        try{
            const {id} = req.body
            await Photo.destroy( {
                where:{id:id}
            })
            return res.json()
        }
        catch (e){
            next(ApiError.badRequest("Something wrong"))
        }
    }

}
module.exports = new PhotosController()