'use strict'

//Modulos
const path = require('path');
const fs = require('fs');

//Models
const User = require('../models/user');
const Animal = require('../models/animal');

//Acciones
function proves(req, res){
    res.status(200).send({
        message: 'Probando el controlador de animales y la accion proves', user: req.user
    });
}

module.exports = {
    proves
}
