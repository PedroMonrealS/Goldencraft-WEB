const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true },
    nombreMC: { type: String, required: true },
    pais: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }

});

module.exports = mongoose.model('usuario', userSchema);
