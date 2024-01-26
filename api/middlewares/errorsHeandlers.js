//Creamos función que nos hará llegar a un middleware de tipo error:
function logErrors(err, req, res, next) {
  console.log('logErrors')
  console.error(err); //mostrar el error en servidor para poder monitorearlo
  next(err); //importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
}


// Crear formato para devolverlo al cliente que se complementa con la función anterior:
function errorHandler(err, req, res, next) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  console.log('errorHandler')
  res.status(500).json({ //indicar que el error es estatus 500 Internal Server Error
    message: err.message, //mostrar al cliente el mensaje de error
    stack: err.stack, //mostrar info del error
  })
}

function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler')
  // Preguntar si el error es de tipo boom
    if (err.isBoom) {
      // traer contenido del error (status code e informacion del error (payload))
      const { output } = err;
      // Responde con el código de estado y el payload
      return res.status(output.statusCode).json(output.payload);
    }else{
    // si no es de tipo boom avanzar al siguiente middleware de error
    next(err);
    }
  }


module.exports = { logErrors, errorHandler, boomErrorHandler}; //exportarlo como modulo
