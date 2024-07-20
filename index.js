const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./modelos/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authorizeRoles = require('./middlewares/authorize');
const mineflayer = require('mineflayer');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

// Middleware para procesar solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos en MongoDB Atlas
const mongoURL = process.env.MONGO_URL;

// Importar las rutas para las noticias y preguntas frecuentes
const rutasNoticias = require('./rutas/noticias.js');
const rutasPreguntasFrecuentes = require('./rutas/preguntasFrecuentes.js');

app.use('/api', rutasNoticias);
app.use('/api', rutasPreguntasFrecuentes);

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

// Configuración de sesión con MongoDB
app.use(session({
    secret: 'GoldencraftA@',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoURL }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Solo true en producción con HTTPS
        maxAge: 3600000 // 1 hora en milisegundos
    },
    name: 'MyCoolWebAppCookieName',
}));

// Confianza en el proxy si está en producción
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Confiar en el primer proxy
}

// Registro de usuario
app.post('/register', async (req, res) => {
    const { nombre, apellidos, correo, nombreMC, pais, password } = req.body;
    try {
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
        return res.sendFile(path.join(__dirname, '/public/front/AdmUser/KO/loginKO.html')); 
    }
    
    try {
        const user = await User.findOne({ correo });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendFile(path.join(__dirname, '/public/front/AdmUser/KO/loginKO.html')); 
        }

        // Guardar información del usuario en la sesión
        req.session.user = correo;
        req.session.role = user.role;
        req.session.nombre = user.nombreMC;


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

// Verificar si el usuario está registrado
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

app.get("/accesodenegado", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/error/accesodenegado/accesodenegado.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/AdmUser/login/login.html'));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/front/AdmUser/register/register.html'));
});

app.get("/insertnoticia", authorizeRoles('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/back/insertNoticia/insertNoticia.html'));
});

app.get("/nuevapreguntafrecuente", authorizeRoles('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/back/insertPreguntaFrecuente/insertPreguntaFrecuente.html'));
});

// Rutas protegidas
app.get('/backend', authorizeRoles('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/back/backend/backend.html'));
});

// Rutas protegidas
app.get('/gestorMinecraft', authorizeRoles('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/back/gestorMinecraft/gestorMinecraft.html'));
});

app.get('/dashboard', authorizeRoles('user', 'admin'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public/front/AdmUser/dashboard/dashboard.html'));
});



app.get('/api/usuario', (req, res) => {
    if (req.session.nombre) {
      res.json({ nombre: req.session.nombre });
    } else {
      res.status(401).json({ error: 'No estás autenticado' });
    }
  });


//BOT MINECRAFT

const bot = mineflayer.createBot({
    host: 'PedroMonrealGamer.aternos.me',
    port: 43226,                     
    username: 'Goldencraft',
    version: '1.20.4'             
  });

  bot.on('spawn', () => {
    console.log('Bot conectado al servidor de Minecraft');
    });

    bot.on('chat', (username, message) => {
        console.log(`[Chat] ${username}: ${message}`);
    });

    bot.on('error', (err) => {
    console.error('Error al conectar o enviar el mensaje:', err);
  });
  
    bot.on('end', () => {
    console.log('Bot desconectado del servidor');
  });

     app.post('/mcBOTmessage', authorizeRoles('admin'), (req, res) => {
    const message = req.query.message;
  
    bot.chat(message);
  
    res.send('<script>alert("Mensaje enviado correctamente"); window.location.href = "/gestorMinecraft";</script>');

  });

  