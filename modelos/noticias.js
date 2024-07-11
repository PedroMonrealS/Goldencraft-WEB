const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticiaSchema = new Schema({
    Autor: { type: String, required: true },
    Titular: { type: String, required: true },
    Contenido: { type: String, required: true },
    foto: { type: String, required: true },
    fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Noticia', noticiaSchema);
