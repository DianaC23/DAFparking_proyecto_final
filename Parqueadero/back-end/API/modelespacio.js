const { Schema, model } = require('mongoose');

const EspacioSchema = new Schema({
     documento: {
        type: Number,
        ref: 'Cliente',
        required: true
    },nombre: {
        type: String,
        required: true
    },
    tipoDeEspacio: {
        type: String,
        required: true,
        enum: ['carro', 'moto', 'bicicleta','camion']
    },
   
    ubicacion: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    placa:{
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('Espacio', EspacioSchema);