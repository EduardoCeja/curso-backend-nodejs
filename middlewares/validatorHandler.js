const boom = require('@hapi/boom');
// Validar los datos
/*
* schema : es el esquema definido para los datos entrantes
* property : indica si esos datos provienen del cuerpo, query , o parametro
* de la petición
*/

function validatorHandler(schema, property) {
  // callback de middleware
  return (req, res, next) => {
    // Capturar datos dinamicamente
    const data = req[property];
    // validador del esquema
    const { error } = schema.validate(data);
    // Si hay un error de validación, se genera un error HTTP 400 (Bad Request) utilizando Boom
    if (error) {
      // enviar mensaje de error de boom de peticion incorrecta
      next(boom.badRequest(error, { abortEarly:false }));
    }
    // Si no hay errores de validación, pasa al siguiente middleware
    next();
  };
}

module.exports = validatorHandler;


