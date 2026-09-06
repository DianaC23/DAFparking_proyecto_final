//MODELO QUE VA A CONTENER LA BASE DE DATOS DDEL CLIENTE
//llamar a moongose
const {Schema, model} = require('mongoose');
//Nueva variable para acceder al esquema de la base de datos
const Clienteschema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    documento: {
        type: Number,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    correo_electronico: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    }
    ,
    rol: {
        type: String,
        required: true,
        enum:['cliente']
    }
},{
        timestamps: true,
        versionKey:false
    });
module.exports = model('Cliente', Clienteschema);