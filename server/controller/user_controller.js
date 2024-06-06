const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs');
const {User, Gallery} = require('../models/models')



const generateJwt = (id, email,name, role) => {
    return jwt.sign(
        {id, email,name, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
        {}
    )
}
class UserController{
    async registration(req, res, next){
        const {email, password, name, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Неверный пароль или email'))
        }
        const chel = await User.findOne({where: {email}})
        if (chel) {
            return next(ApiError.badRequest('Этот email уже использует другой челик!'))
        }
        const hashPas = await bcrypt.hash(password, 5)
        const temp = await User.create({email, role,name, password: hashPas})
       
        const token = generateJwt(temp.id, temp.email,temp.name , temp.role)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const temp = await User.findOne({where: {email}})
        if (!temp) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let compPas = bcrypt.compareSync(password, temp.password)
        if (!compPas) {
            return next(ApiError.internal('Пароль неверный, записывайте пароль на листочке'))
        }
        const token = generateJwt(temp.id, temp.email,temp.name, temp.role)
        return res.json({token})
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role)
        return res.json({token})
    }
    async getAll(req, res) {
        const user = await User.findAll()
    return res.json(user)
    }

    async GetUserInfo(req, res){
        let {id} = req.query
        const t = await sequelize.transaction()
        try{
            let UserInf = await User.findOne({where:{id}},{transaction:t})
            let WhomId = id
            let GalleryInfo = await Gallery.findAll({where:{WhomId}},{transaction:t})
            await t.commit()
            let {email} = UserInf
            let Us = {email}
            let Obj = {Us, GalleryInfo}
            return res.json(Obj)
        }
        catch (e) {
            await t.rollback()
        }
    }
    
    async UpdatePhoto(req, res, next) {
        console.log("s11111111")
        try {
            console.log("s1111111122")
            const{Id} = req.body
            console.log(Id)
            let photo = req.files.photo
            console.log(photo)
            console.log(Id,photo,"hui")
            let Dimka = await User.findOne({where:{id:Id}})
            if(Dimka.photo){
                fs.unlink(`../server/static/${Dimka.photo}`,(err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

            })}
                let filename = uuid.v4() + ".jpg"
                await photo.mv(path.resolve(__dirname, '..', 'static', filename))
                Dimka.photo = filename
                await Dimka.save()
                return res.json(Dimka.photo)
            }
         catch (e) {
            next(ApiError.badRequest("Something wrong"))
        }
    }



}

module.exports = new UserController()

