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
                    res.redirect('/accesodenegado'); 
                }
            } catch (err) {
                res.redirect('/accesodenegado'); 
            }
        } else {
            res.redirect('/login'); 
        }
    };
}

module.exports = authorizeRoles;
