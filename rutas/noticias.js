const express = require('express');
const noticiaSchema = require('../modelos/noticias'); 
const router = express.Router();

router.post('/nuevaNoticia', (req, res) => {
    console.log('Datos recibidos:');
    console.log(req.body); // Imprime los datos recibidos en la consola del servidor

    const nuevaNoticia = new noticiaSchema(req.body);

    nuevaNoticia.save()
        .then((noticiaGuardada) => {
            res.json({ mensaje: "Noticia añadida exitosamente", noticia: noticiaGuardada });
        })
        .catch((error) => {
            console.error('Error al guardar la noticia:', error);
            res.status(500).json({ mensaje: 'Error al guardar la noticia', error: error.message });
        });
});


router.get('/noticias', (req, res) => {
    noticiaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})
module.exports = router;
