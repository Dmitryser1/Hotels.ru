const sequelize = require('../db')
const {DataType, DataTypes} = require('sequelize')

const User = sequelize.define('User', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type:DataTypes.STRING, unique:true, allowNull: false},
    name: {type: DataTypes.STRING, unique:false},
    password: {type: DataTypes.STRING, allowNull: false},
    photo: {type: DataTypes.STRING},
    role: {type: DataTypes.ENUM("1","0"), defaultValue:"0"},
    charasteristic: {type: DataTypes.STRING, allowNull: true},
})

const Galleries = sequelize.define('Galleries', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    GalleryName: {type: DataTypes.STRING, unique:false},
    Mainphoto: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING, defaultValue:""},
})

const Types = sequelize.define('Types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, unique:false},
})

const Photo = sequelize.define('Photo',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    photo: {type: DataTypes.STRING},
})

const Comments = sequelize.define('Comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
})

const Complaint = sequelize.define('Complaint', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.BOOLEAN, defaultValue: false}
})

User.hasMany(Galleries)
Galleries.belongsTo(User)

User.hasMany(Comments)
Comments.belongsTo(User)

Galleries.hasMany(Photo)
Photo.belongsTo(Galleries)

Galleries.hasMany(Types)
Types.belongsTo(Galleries)


Galleries.hasMany(Comments)
Comments.belongsTo(User) // См комментарий выше

User.hasMany(Complaint)
Complaint.belongsTo(User)

module.exports = {
    User,
    Galleries,
    Types,
    Photo,
    Comments,
    Complaint,
}
