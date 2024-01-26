const express = require('express'); // Requerir libreria express
//Importación del archivo productsRouter.js
const productsRouter = require('./productsRouter');
//Importación de archivo usersRouter.js
const usersRouter = require('./usersRouter')
//Importación de archivo categoriesRouter.js
const categoriesRouter = require('./categoriesRouter')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/products', productsRouter);
  router.use('/users',usersRouter);
  router.use('/categories',categoriesRouter);
}

module.exports = routerApi;

