const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());

const router = require('./routes/index.js');
app.use('/', router);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));