const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const router = require('./routes/index.js');
app.use('/', router);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Botomer1@",
    database: "TECH_STORE",
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

const registerUser = async (username, contrasena) => {
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        console.log(hashedPassword);
        db.query(
            'INSERT INTO users (username, password, user_type) VALUES (?, ?, ?);',
            [username, hashedPassword, "administrador"],
            (err, result) => {
                if (err) {
                    console.error('Error al insertar usuario:', err);
                    return;
                }
                console.log('Usuario registrado exitosamente:', result);
            }
        );
    } catch (err) {
        console.error('Error al registrar usuario:', err);
    }
};

// Ejemplo de uso del script
const nombreUsuario = 'Diego2';
const contrasena = '123456789';

registerUser(nombreUsuario, contrasena);
