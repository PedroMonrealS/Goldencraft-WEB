const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const serveIndex = require('serve-index');


const app = express();
const port = 80;

// Middleware para procesar solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', serveIndex(path.join(__dirname, 'public')));

// Conexión a la base de datos en MongoDB Atlas
const mongoURL = 'mongodb+srv://goldencraftWEB:GoldencraftAdmins%40@goldencraft.uoswo3m.mongodb.net/mydatabase';

// Importar las rutas para las noticias
const rutasNoticias = require('./rutas/noticias.js');
app.use('/api', rutasNoticias);

// Conexión a MongoDB y inicio del servidor
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Conectado a MongoDB');
        // Iniciar el servidor una vez conectado a la base de datos
        app.listen(port, () => {
            console.log(`Servidor iniciado en el puerto ${port}`);
        });
    }).catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
    });

// Rutas para servir archivos HTML estáticos
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/index/index.html'));
});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/AdmUser/register/register.html'));
});

// Ruta para servir el formulario de agregar noticia
app.get("/nuevanoticia", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/back/insertNoticia/insertNoticia.html'));
});

// Ruta para servir el archivo test.html
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/testthree/test.html'));
});
