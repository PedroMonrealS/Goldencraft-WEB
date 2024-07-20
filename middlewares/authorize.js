const User = require('../modelos/user'); // Asegúrate de que la ruta al modelo sea correcta

function authorizeRoles(...roles) {
    return async (req, res, next) => {
        if (req.session.user) {
            try {
                // Buscar el usuario por correo en la sesión
                const user = await User.findOne({ correo: req.session.user });
                
                if (user && roles.includes(user.role)) {
                    next(); // Usuario tiene el rol adecuado
                } else {
                    res.status(403).send('Acceso denegado'); // Usuario no tiene permiso
                }
            } catch (err) {
                res.status(500).send('Error interno del servidor');
            }
        } else {
            res.redirect('/login'); 
        }
    };
}

module.exports = authorizeRoles;
