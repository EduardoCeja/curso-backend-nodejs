/**
* La función express() es una función top-level
* exportada por el módulo express
*/
const express = require('express'); // Requerir libreria express
const cors = require('cors'); // Requerir libreria cors
const routerApi = require('./routes'); // Controlador de rutas

// Importar middleware
const { logErrors, errorHandler,boomErrorHandler } = require('./middlewares/errorsHeandlers'); //importar las funciones que se uilizarán
const app = express(); // Crear instancia de aplicacion de express
const port = 3000; // Puerto en el que se ejecutara el servidor
// Enrutador de la aplicacion
/*
 * req : parametro que contiene toda lo necesario de la petición desde el cliente
 * res : parametro que contiene todo lo necesario para responder al cliente
 */


/*Cuando recibes una solicitud POST o PUT con datos en formato JSON, el middleware express.json() se encarga de analizar esos datos y ponerlos en req.body, para que puedas acceder a ellos en las rutas de tu aplicación.
*/
app.use(express.json());

// Lista de origenes permitidos
const whitelist = ['http://172.24.70.134:5500', 'https://myapp.co'];
// Configuracion de cors
const options = {
  origin: (origin, callback) => {
		// si esta en la lista de origenes o es el mismo origen de la api
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
			// lanza un error si no esta permitido
      callback(new Error('No Permitido'));
    }
  },
};
// Asociar el middleware para la gestion por parte de express , pasandole
// la configuracion realizada
app.use(cors(options));
//definimos la ruta
// tiene un callback que va a ejecutar la respuesta que enviemos al cliente.
//el callback siempre tiene doclears parámetros "req" y "res".
app.get ("/", (req, res) => {
  //Respuesta al cliente
  res.send("hola mi server en express");
});
app.get('/nueva-ruta', (req, res) => {
  // Respuesta al cliente
  res.send('Hola , soy una nueva ruta');
});

// Se llama al controlador de rutas y se le pasa la aplicación
// en la cual estamos realizando el enrutamiento
routerApi(app)

// Utilizamos los middleware. Siempre deben ir después del routing:
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

// Escuchar en que puerto se ejecutara el servidor
app.listen(port, () => {
  console.log("La aplicación corre en el puerto " + port);
})

