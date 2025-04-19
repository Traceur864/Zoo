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

// Metodo para actualizar animales

async function updateAnimal(req, res) {
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, { new: true })
       .populate({path:'user'}).exec()
       .then(animalUpdated => {
            if (!animalUpdated) {
                return res.status(404).send({
                    message: 'No se ha actualizado el animal'
                });
            } else {
                return res.status(200).send({
                    animal: animalUpdated
                });
            }
        })
       .catch(err => {
            return res.status(500).send({
                message: 'Error al actualizar el animal',
                error: err.message
            });
        });
}

async function uploadImage(req, res){
    var animalId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'png' || file_ext == 'gif') {
    
            try {
                const animalUpdated = await Animal.findByIdAndUpdate(animalId,{image:file_name}, { new: true });
                if (!animalUpdated) {
                    return res.status(404).send({ message: 'No se ha podido actualizar el animal' });
                }
                return res.status(200).send({ animal: animalUpdated, image: file_name });
            } catch (err) {
                return res.status(500).send({ message: 'Error al actualizar animal' });
            }
        }else{
            fs.unlink(file_path, (err) => {
                if (err){
                    res.status(500).send({ message: 'Error al eliminar archivo anterior', error: err.message });
                    console.log('Archivo eliminado');
                }else{
                    res.status(400).send({ message: 'Extensión no valida' });
                }
            });
        }
    }else{
        res.status(400).send({ message: 'No se han subido archivos' });
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/animals/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({ message: 'La imagen no existe' });
        }  
        //Si no existe el archivo, envía un mensaje de error 404.  //Si existe, envía el archivo.  // Si hay algún error, envía un mensaje de error 500.  // Esto es un ejemplo simple y puede cambiar según sea necesario.  // En el ejemplo anterior, la imagen se encuentra en la carpeta 'uploads/users/'.  // Si la carpeta 'uploads' no existe, se creará automáticamente.  // La carpeta 'users' también se creará automáticamente si no existe.  // El nombre de la imagen se envía como parámetro en la URL.
    })
}

function deleteAnimal(req, res){
    var animalId = req.params.id;

    Animal.findByIdAndDelete(animalId)
       .then(animalDeleted => {
            if (!animalDeleted) {
                return res.status(404).send({ message: 'No se ha podido eliminar el animal' });
            } else {
                return res.status(200).send({ message: 'Animal eliminado' });
            }
        })
       .catch(err => {
            return res.status(500).send({ message: 'Error al eliminar el animal', error: err.message });
        });
}

module.exports = {
    proves,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    uploadImage,
    getImageFile,
    deleteAnimal
}
