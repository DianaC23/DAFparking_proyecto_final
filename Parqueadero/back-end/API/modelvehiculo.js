//MODELO QUE VA A CONTENER LA BASE DE DATOS DE LOS DATOS DEL VEHICULO
//llamar a moongose
const {Schema, model} = require('mongoose');
//Nueva variable para acceder al esquema de la base de datos
const Vehiculoschema = new Schema({
    tipo:{
        type: String,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    documento: {
        type: Number,
        required: true
    },
},{
        timestamps: true,
        versionKey:false
    });
module.exports = model('Vehiculo', Vehiculoschema);