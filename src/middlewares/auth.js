
export const isLoggedIn = (req, res, next) => {
    if(req.session.user){
        next(); //Permitir el acceso si hay sesión
    } else {
        res.redirect('/login'); //Redirigo al login si no hay sesión
    }
}

export const isLoggedOut = (req, res, next) => {
    if(req.session.user){
        res.redirect('/perfil'); //Redirige al perfil si ya estoy logueado
    } else {
        next(); //Permitir el acceso si no hay sesión
    }
}

export const authorize = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        }
        return res.status(403).json({ message: 'Acceso denegado' });
    };
};