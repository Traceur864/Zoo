'use strict'
//Modulos
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

//Models
const User = require('../models/user');

// Service JWT
const jwt = require('../services/jwt');
const user = require('../models/user');



//Acciones
function proves(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usarios y la accion proves', user: req.user
    });
}

async function SaveUser(req, res) {
    // Crear el objeto del usuario
    const user = new User();

    // Recoger parámetros de la petición
    const params = req.body;

    if (params.password && params.name && params.surname && params.email) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_ADMIN';
        user.image = null;

        try {
            const existingUser = await User.findOne({ email: user.email.toLowerCase() });
            if (!existingUser) {
                try {
                    const hash = await bcrypt.hash(params.password,  10);
                    user.password = hash;

                    try {
                        const userStored = await user.save();
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    } catch (saveError) {
                        res.status(500).send({ message: 'Error al guardar el usuario', error: saveError.message });
                    }
                } catch (hashError) {
                    res.status(500).send({ message: 'Error al hash la contraseña', error: hashError.message });
                }
            } else {
                res.status(200).send({ message: 'El usuario ya existe y no puede registrarse' });
            }
        } catch (findError) {
            res.status(500).send({ message: 'Error al buscar el usuario', error: findError.message });
        }
    } else {
        res.status(400).send({ message: 'Introduce los datos correctamente' });
    }
}

async function Login(req, res) {
    try {
        console.log('Solicitud recibida:', req.body);

        var params = req.body;
        var email = params.email.toLowerCase();
        var password = params.password;

        const user = await User.findOne({ email: email });
        console.log('Usuario encontrado:', user);

        if (user) {
            const check = await bcrypt.compare(password, user.password);
            console.log('Contraseña verificada:', check);

            if (check) {

                // Comprobar y generar TOKEN
                if (params.gettoken) {
                    // Devolver el token
                    res.status(200).send({
                        token: jwt.createToken(user)
                    });
                } else {
                    return res.status(200).send({ user });
                }
            } else {
                return res.status(404).send({ message: 'El usuario no se ha podido logearse correctamente' });
            }
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido logearse' });
        }
    } catch (err) {
        console.error('Error en el proceso de login:', err);
        return res.status(500).send({ message: 'Error al comprobar el usuario', error: err.message });
    }
}

async function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(403).send({ message: 'No tienes permiso para actualizar usuario' });
    }

    try {
        const userUpdated = await User.findByIdAndUpdate(userId, update, { new: true });
        if (!userUpdated) {
            return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
        }
        return res.status(200).send({ user: userUpdated });
    } catch (err) {
        return res.status(500).send({ message: 'Error al actualizar usuario' });
    }
}

async function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'png' || file_ext == 'gif') {
            if (userId != req.user.sub) {
                return res.status(403).send({ message: 'No tienes permiso para actualizar usuario' });
            }
        
            try {
                const userUpdated = await User.findByIdAndUpdate(userId,{image:file_name}, { new: true });
                if (!userUpdated) {
                    return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                }
                return res.status(200).send({ user: userUpdated, image: file_name });
            } catch (err) {
                return res.status(500).send({ message: 'Error al actualizar usuario' });
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
    var path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({ message: 'La imagen no existe' });
        }  //Si no existe el archivo, envía un mensaje de error 404.  //Si existe, envía el archivo.  // Si hay algún error, envía un mensaje de error 500.  // Esto es un ejemplo simple y puede cambiar según sea necesario.  // En el ejemplo anterior, la imagen se encuentra en la carpeta 'uploads/users/'.  // Si la carpeta 'uploads' no existe, se creará automáticamente.  // La carpeta 'users' también se creará automáticamente si no existe.  // El nombre de la imagen se envía como parámetro en la URL.
    })
}

 async function getKeepers(req, res){
    try {
        const Useradmin = await User.find({role:'ROLE_ADMIN'}).exec();
        if(!Useradmin){
            return res.status(404).send({message: 'No hay usuarios administradores'});
        }else{
            return res.status(200).send({Useradmin});
        }
    } catch (error) {
        res.status(500).send({message: 'Error en la peticion'});
    }
} 
/* function getKeepers(req, res) {
    User.find({ role: 'ROLE_USER' }).exec()
        .then(users => {
            if (!users) {
                res.status(404).send({ message: 'No hay usuarios administradores' });
            } else {
                res.status(200).send({ users });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error en la petición' });
        });
}
 */
module.exports = { 
    proves,
    SaveUser,
    Login, 
    updateUser,
    uploadImage,
    getKeepers,
    getImageFile
 };