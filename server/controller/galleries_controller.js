const {Photo, Galleries} = require('../models/models.js')
const ApiError = require('../error/ApiError.js')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');


class GalleryController{
    async create(req, res, next){
        try{
            //const {GalleryName} = req.body
            console.log(req.body)
            console.log(req.files)
            //const  {Mainphoto} = req.files
            const{GalleryName} = req.body
           
            let Mainphoto = req.files.photos
           
            //console.log("MAINPH", Mainphoto)
           
        
            let filename = uuid.v4() + '.jpg'
            
            //console.log("121212", path.resolve(__dirname, '..', 'static', filename))
           
            await Mainphoto.mv(path.resolve(__dirname, '..', 'static', filename))

            let UserId = req.user.id
            console.log("123", UserId, GalleryName, Mainphoto)

            const gallery = await Galleries.create({GalleryName, Mainphoto: filename, UserId})
            return res.json(gallery)
        } catch(e){
            next(ApiError.badRequest("Something wrong createalb"))
        }
    }

    async getAllGalleryCarrentUser(req, res){
        let UserId = req.user.id
        let gallery = await Galleries.findAll({where: {UserId}})
        return res.json(gallery)
    }

    async getAllGallery(req, res){
        let gallery = await Galleries.findAll()
        return res.json(gallery)
    }

    async del(req, res, next) { //Удаление самой галереи
        try{
            const {id} = req.body
            await Galleries.destroy( {
                where:{id:id}
            })
            return res.json()
        }
        catch (e){
            next(ApiError.badRequest("Something wrong delgal"))
        }
    }
    
    async getAllPhoto(req, res, next){ //Возращает все фото, которые принадлежат галерее
        try{
            console.log(3)
            const {id} = req.params
            const photos = await Photo.findAll({where:{GalleryId: id}})
            console.log(photos)
            return res.json(photos)

        }catch(e){
            next(ApiError.badRequest("Something wrong getallph"))
        }

    }
    
    async updatePhoto(req, res, next){
        try{ // Создает обьект фотку с привязкой к галерее, Котороую мы передаем ( в текущую, тут будет где-то метод гета по всем фото, которая этой галерее принадлежат)
            const {GalleryId} = req.body
            let photo = req.files.photos
            console.log(3)
            let filename = uuid.v4() + '.jpg'
            await photo.mv(path.resolve(__dirname, '..', 'static', filename))
            const photos = await Photo.create({GalleryId, photo: filename})
            return res.json(photos)

        } catch(e){
            next(ApiError.badRequest("Something wrong updph"))
        }
    }
}

module.exports = new GalleryController()