const db = require('../lib/db.js');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

module.exports = {
    signUp: (req, res) => {
        db.query(
            'SELECT email FROM customers WHERE lower(email) = lower(?)',
            [req.body.email],
            (err, result) => {
                if (result && result.length) {
                    return res.status(409).send({
                        message: 'Email already in use',
                    });
                } else {
                    // Check if the username is already in use
                    db.query(
                        'SELECT username FROM users WHERE lower(username) = lower(?)',
                        [req.body.username],
                        (err, result) => {
                            if (result && result.length) {
                                return res.status(409).send({
                                    message: 'Username already in use',
                                });
                            } else {
                                // Username not in use, proceed with registration
                                bcrypt.hash(req.body.contrasena, 10, (err, hash) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: err,
                                        });
                                    } else {
                                        db.query(
                                            'CALL add_customer(?, ?, ?, ?, ?)',
                                            [req.body.username, hash, req.body.email, req.body.phone, req.body.address],
                                            (err3, result) => {
                                                if (err3) {
                                                    return res.status(400).send({
                                                        message: err3,
                                                    });
                                                } else {
                                                    return res.status(201).send({
                                                        message: 'Registration successful',
                                                    });
                                                }
                                            }
                                        );
                                    }
                                });
                            }
                        }
                    );
                }
            }
        );
    }
};