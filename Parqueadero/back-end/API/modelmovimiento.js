//MODELO QUE VA A CONTENER LA BASE DE DATOS DDEL EMPLEADO
//llamar a moongose
const {Schema, model} = require('mongoose');
//Nueva variable para acceder al esquema de la base de datos
const Movimientoschema = new Schema({
    documento: {
        type: Number,
        ref: 'Cliente',
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    espacio: {
        type: String,
        required: true
    },
    valor_pagado: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum:['Entrada','Salida']
    }
    //Para saber la fecha de entrada o de salida
},{
        timestamps: true,
        versionKey:false
    });
module.exports = model('Movimiento', Movimientoschema);