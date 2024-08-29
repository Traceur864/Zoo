'use strict'


const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;



mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/zoo')
  .then(() => {
    console.log("Conexión a MongoDB exitosamente");

    // Creación del servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo exitosamente en la URL http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err)); 
 
