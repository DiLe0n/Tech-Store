const jwt = require("jsonwebtoken");

module.exports = {
    validateSignUp: (req, res, next) => {
        //nombreUsuario de 3 caracteres
        if (!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                message: 'Ingresa un nombre de usuario de mínimo 3 caracteres',
            });
        }
        //Contraseña de 6 caracteres
        if (!req.body.contrasena || req.body.contrasena.length < 6) {
            console.log(req.body.contrasena);
            console.log(req.body.contrasena.length);
            console.log("hola3");
            return res.status(400).send({
                message: 'Ingresa una contraseña de mínimo 6 caracteres',
            });
        }
        //La repeticion de la contraseña debe ser igual
        if (
            !req.body.contrasena_repetida ||
            req.body.contrasena != req.body.contrasena_repetida
        ) {
            console.log("hola4");
            return res.status(400).send({
                message: 'Las contraseñas deben ser iguales',
            });
        }
        console.log("paso validacion")
        next();
    }
}