const express = require('express');
const preguntaSchema = require('../modelos/preguntasFrecuentes'); // Asegúrate de que el nombre sea el correcto
const router = express.Router();

// Endpoint para agregar una nueva pregunta
router.post('/nuevaPreguntaFrecuente', (req, res) => {
    console.log('Datos recibidos:');
    console.log(req.body);

    const nuevaPregunta = new preguntaSchema(req.body); // Asegúrate de usar el nombre correcto

    nuevaPregunta.save()
        .then((preguntaGuardada) => {
            res.json({ mensaje: "Pregunta añadida exitosamente", pregunta: preguntaGuardada });
        })
        .catch((error) => {
            console.error('Error al guardar la pregunta:', error);
            res.status(500).json({ mensaje: 'Error al guardar la pregunta', error: error.message });
        });
});

// Endpoint para obtener todas las preguntas frecuentes
router.get('/preguntasFrecuentes', async (req, res) => {
    try {
        const data = await preguntaSchema.find(); // Asegúrate de usar el nombre correcto
        res.json(data);
    } catch (error) {
        console.error('Error al obtener las preguntas frecuentes:', error);
        res.status(500).json({ mensaje: 'Error al obtener las preguntas frecuentes', error: error.message });
    }
});

module.exports = router;
