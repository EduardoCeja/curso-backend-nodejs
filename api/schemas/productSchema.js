const Joi = require('joi');//Importación de la libreria

// Definición de esquemas de validación utilizando Joi
const id = Joi.string().uuid(); // Define un esquema para el campo "id" que debe ser una cadena UUID.
const name = Joi.string().min(3).max(15); // Define un esquema para el campo "name" que debe ser una cadena alfanumérica de longitud entre 3 y 15 caracteres.
const price = Joi.number().integer().min(10); // Define un esquema para el campo "price" que debe ser un número entero y no puede ser menor que 10.
const image = Joi.string().uri();//Define un esquema para el campo "imge"

// Esquema de validación para la creación de un producto
const createProductSchema = Joi.object({
  name: name.required(), // El campo "name" es obligatorio.
  price: price.required(), // El campo "price" es obligatorio.
  image: image.required() // El campo "img" es obligatorio.
});

// Esquema de validación para la actualización de un producto
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

// Esquema de validación para obtener un producto
const getProductSchema = Joi.object({
  id: id.required(), // El campo "id" es obligatorio.
});



// Exportar los esquemas de validación
module.exports = { createProductSchema, updateProductSchema, getProductSchema };
