const { Schema, model } = require('mongoose');

const TarifaSchema = new Schema({
    placa:{
        type: String,
        required: true
    },
    tipoVehiculo: {
        type: String,
        required: true,
        enum: ['carro', 'moto', 'bicicleta','camion']
    },
    valor_pagado: {
        type: Number,
        required: true
    },
    metodo_pago:{
        type: String,
        required:true,
        enum: ['efectivo','tarjeta','transferencia']
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('Tarifa', TarifaSchema);