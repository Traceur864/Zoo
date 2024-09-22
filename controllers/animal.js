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

// Metodo para guardar animales
async function saveAnimal(req, res) {
    try {
        const animal = new Animal();
        const params = req.body;

        if (params.name) {
            animal.name = params.name;
            animal.description = params.description;
            animal.year = params.year;
            animal.image = null;
            animal.user = req.user.sub;

            const animalStored = await animal.save();

            if (!animalStored) {
                return res.status(404).send({
                    message: 'No se ha guardado el animal'
                });
            } else {
                return res.status(200).send({
                    animal: animalStored
                });
            }
        } else {
            return res.status(400).send({
                message: 'El nombre del animal es obligatorio'
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: 'Error al guardar el animal',
            error: err.message
        });
    }
}

// Metodo para obtener animales

function getAnimals(req, res) {
    Animal.find({}).populate({path:'user'}).exec()
       .then(animals => {
            if (!animals) {
                return res.status(404).send({
                    message: 'No hay animales'
                });
            } else {
                return res.status(200).send({
                    animals
                });
            }
        })
       .catch(err => {
            return res.status(500).send({
                message: 'Error al obtener los animales',
                error: err.message
            });
        });
}

// Metodo para obtener animal por usuario

async function getAnimal(req, res) {

    var animalId = req.params.id;

    Animal.findById(animalId).populate({path:'user'}).exec()
    .then(animal => {
        if (!animal) {
            return res.status(404).send({
                message: 'No hay animal'
            });
        } else {
            return res.status(200).send({
                animal
            });
        }
    })
   .catch(err => {
        return res.status(500).send({
            message: 'Error al obtener el animal',
            error: err.message
        });
    });
}


module.exports = {
    proves,
    saveAnimal,
    getAnimals,
    getAnimal
}
