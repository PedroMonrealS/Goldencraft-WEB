const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./modelos/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const authorizeRoles = require('./middlewares/authorize');

require('dotenv').config();

const app = express();
const port = 80;

// Middleware para procesar solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'GoldencraftA@',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Solo en producción debe ser true
}));

// Conexión a la base de datos en MongoDB Atlas
const mongoURL = process.env.MONGO_URL;

// Importar las rutas para las noticias y preguntas frecuentes
const rutasNoticias = require('./rutas/noticias.js');
const rutasPreguntasFrecuentes = require('./rutas/preguntasFrecuentes.js');

app.use('/api', rutasNoticias);
app.use('/api', rutasPreguntasFrecuentes);

// Conexión a MongoDB y inicio del servidor
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
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
    
    if (!correo || !password) {
        return res.status(400).send('Correo o contraseña no proporcionados');
    }
    
    try {
        const user = await User.findOne({ correo });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendFile(path.join(__dirname, '/public/front/AdmUser/KO/loginKO.html')); 
        }

        // Guardar información del usuario en la sesión
        req.session.user = correo;
        req.session.role = user.role; // Asigna el rol a la sesión

        res.redirect('/'); 
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
});


// Ruta de logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error al cerrar sesión');
        }
        res.redirect('/'); 
    });
});
//para verificar si el usuario está registrado
app.get('/api/check-auth', (req, res) => {
    console.log('Sesión actual:', req.session); // Añade esta línea para depurar
    if (req.session.user) {
        res.json({
            authenticated: true,
            user: req.session.user,
            role: req.session.role 
        });
    } else {
        res.json({ authenticated: false });
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




//Protegido
// Ruta protegida para administradores
app.get('/backend', authorizeRoles('admin'), (req, res) => {
    res.send('Bienvenido, administrador');
});

// Ruta protegida para usuarios normales
app.get('/dashboard', authorizeRoles('user', 'admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/front/AdmUser/dashboard/dashboard.html'));
});