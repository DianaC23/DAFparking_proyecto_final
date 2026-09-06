//MODELO QUE VA A CONTENER LA BASE DE DATOS DDEL EMPLEADO
//llamar a moongose
const {Schema, model} = require('mongoose');
//Nueva variable para acceder al esquema de la base de datos
const Empleadoschema = new Schema({
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
        ref: 'Cliente',
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
    },
    rol: {
        type: String,
        required: true,
        enum:['administrador','trabajador']
    }
    
},{
        timestamps: true,
        versionKey:false
    });
module.exports = model('Empleado', Empleadoschema);