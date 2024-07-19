const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preguntaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fondo: { type: String, required: true },
    enlace: { type: String, required: true },
});

module.exports = mongoose.model('Pregunta', preguntaSchema);
