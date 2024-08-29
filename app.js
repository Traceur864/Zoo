'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Rutas

const user_router = require('./routes/user');
const animal_router = require('./routes/animal');

// Middlewares de body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta raíz para verificar el servidor
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Servidor funcionando correctamente' });
});

// Ruta de prueba
app.get('/probando', (req, res) => {
    res.status(200).send({ message: 'This is a message' });
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Usar el archivo de rutas adicionales
app.use('/api', user_router);
app.use('/api', animal_router);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

module.exports = app;