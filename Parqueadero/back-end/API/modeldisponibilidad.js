const { Schema, model } = require('mongoose');

const DisponibilidadSchema = new Schema({
     documento: {
        type: Number,
        ref: 'Cliente',
        required: true
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('Disponibilidad', DisponibilidadSchema);