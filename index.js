const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./modelos/user');
const bcrypt = require('bcrypt');
require('dotenv').config();


const app = express();
const port = 80;

// Middleware para procesar solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos en MongoDB Atlas
const mongoURL = process.env.MONGO_URL;

// Importar las rutas para las noticias y preguntas frecuentes
const rutasNoticias = require('./rutas/noticias.js');
const rutasPreguntasFrecuentes = require('./rutas/preguntasFrecuentes.js');

app.use('/api', rutasNoticias);
app.use('/api', rutasPreguntasFrecuentes);

// Conexión a MongoDB y inicio del servidor
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Conectado a MongoDB');
        app.listen(port, () => {
            console.log(`Servidor iniciado en el puerto ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error de conexión a MongoDB:', error);
    });

// Registro de usuario
app.post('/register', async (req, res) => {
    const { nombre, apellidos, correo, nombreMC, pais, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.sendFile(path.join(__dirname, '/public/front/AdmUser/KO/registerKO.html'));
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            nombre,
            apellidos,
            correo,
            nombreMC,
            pais,
            password: hashedPassword,
        });
        await newUser.save();
        res.redirect('/'); 
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).send('Internal server error');
    }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
    const { correo, password } = req.body;
    
    // Verificar los datos que llegan
    
    if (!correo || !password) {
        return res.status(400).send('Correo o contraseña no proporcionados');
    }
    
    try {
        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ correo });
        
        // Verificar si el usuario existe y la contraseña es correcta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendFile(path.join(__dirname, '/public/front/AdmUser/KO/loginKO.html')); 
        }

        res.redirect('/'); 
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});



// Rutas para servir archivos HTML estáticos
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/index/index.html'));
});

app.get("/443", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/error/443/443.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/AdmUser/login/login.html'));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/AdmUser/register/register.html'));
});

app.get("/nuevanoticia", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/back/insertNoticia/insertNoticia.html'));
});

app.get("/nuevapreguntafrecuente", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/back/insertPreguntaFrecuente/insertPreguntaFrecuente.html'));
});
