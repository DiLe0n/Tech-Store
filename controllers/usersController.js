const db = require('../lib/db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        db.query(
            'SELECT * FROM users WHERE username = ?',
            [req.body.username],
            (err, result) => {
                if (err) {
                    res.status(400).send({
                        message: err,
                    });
                } else if (!result.length) {
                    console.log("si funciona");
                    res.status(400).send({
                        message: "Incorrect username or password",
                    });
                } else {
                    console.log(req.body);
                    console.log(result[0]);
                    bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
                        if (bErr) {
                            console.log('Error in bcrypt.compare:', bErr);
                            res.status(400).send({
                                message: "Incorrect username or password 3",
                            });
                        } else if (bResult) {
                            // Password is correct
                            console.log(process.env.SECRET_KEY)
                            const token = jwt.sign(
                                {
                                    // PAYLOAD
                                    username: result[0].username,
                                    userId: result[0].id,
                                    tipo: result[0].user_type
                                }, process.env.SECRET_KEY, { expiresIn: '7d'});
                            res.status(200).send({
                                message: 'Login successful',
                                token: token,
                                admin: result[0].user_type
                            });
                        } else {
                            res.status(400).send({
                                message: "Incorrect username or password",
                            });
                        }
                    });
                }
            }
        );
    }
};