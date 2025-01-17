const jwt = require("jsonwebtoken");

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(400).send({
                message: "La sesión no es válida"
            })
        }
        try {
            const authHeader = req.headers.authorization
            const token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.userData = decoded
            next()
        } catch (err) {
            return res.status(400).send({
                message: "La sesión no es válida"
            })
        }
    },

    
    isAdmin: (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).send('Token no proporcionado.');
        }
        jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send('Token no válido.');
            }
            console.log(decoded);
            if (decoded.tipo != 'administrador') { // Verifica si el usuario es administrador
                return res.status(403).send('Acceso denegado: se requiere rol de administrador.');
            }
            req.user = decoded; // Adjunta datos decodificados del usuario a la solicitud
            next();
        });
    }
    
}