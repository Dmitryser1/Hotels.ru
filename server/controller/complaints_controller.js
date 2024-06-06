const {Complaint} = require('../models/models.js')
const ApiError = require('../error/ApiError.js')

class complaintsController{
    async create (req, res, next){
        try{
            const {text} = req.body
            let UserId = req.user.id
           
            const complaint = await Complaint.create({text, UserId})
            return res.json(complaint)
        } catch(e){
            next(ApiError.badRequest("Something wrong crte appeal"))
        }
    }

    async getAll(req, res){
        let complaint 
            complaint = await Complaint.findAndCountAll()
            return res.json(complaint)
    }

    async updateStatus(req, res, next){
        try{
            const {id} = req.params
            console.log(id)
            const {Status} = req.body //Статус, на который мы хотим поменять, получаем с фронта 
            const complaint = await Complaint.findByPk(id);
            if(!complaint){
                return next(ApiError.internal(`Жалоба id = ${id} не найдена`));
            }
            console.log(Status)
            complaint.Status = Status
            await complaint.save()
            return res.json(complaint)
            
        }  catch(e){
            console.error(e);
            next(ApiError.internal(`Не удалось обновить жалобу с id=${id}`));
        }

    }

    async del(req, res, next){ //тут был делит по кнопке по id, но это слишком очевидно, вот неработающий код
        try {
            //const {id} = req.body
            //console.log(complaint)
            const complaint = await Complaint.findAll({where: {Status: true}})
            
            for (const item of complaint) {
                await Complaint.destroy({ where: { id: item.id } });
              }
            return res.json()

        } catch(e){
            next(ApiError.badRequest("Something wrong"))  
        }
    }

}

module.exports = new complaintsController()