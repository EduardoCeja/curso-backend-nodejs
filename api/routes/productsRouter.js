const express = require('express'); // Requerir libreria express

//Mandamos a llamar el servicio productService
const ProductsService = require ('./../servicios/productServices')

//Importacipon de validatorHandler y a productSchemas
const validatorHandler = require('./../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/productSchema')

//Creación de un enrutador
const router = express.Router();

//Creación de nueva instancia del servicio
const service = new ProductsService();

//Estracción del servicio que utiliza el método find() de ProductsService
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
});

router.get('/filter', (req,res) => {
  res.send('Yo soy un filter')
})

//Creación de un nuevo edpoint para obtener un identificador en especifico
router.get('/:id',
  // Llamamos al middleware validador con el schema getProduct y
  // la informacion proviene de los parametros
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {//se agrega el next
    try{
      //Recuperar parametro id
      const { id } = req.params;
      //Utilizar un servicio (service) para buscar un producto por su ID
      const product = await service.findOne(id);
      //Responder con el producto encontrado en formato JSON
      res.json(product)
    }catch(error){
      next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
  });

//Creación de edpoint para peticiones POST
router.post('/',
  // Llamamos al middleware validador con el schema createProductSchema y
  // la informacion proviene del body
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    // Obtener el cuerpo (body) de la solicitud
    const body = req.body;
    // Utilizar el servicio (service) para crear un nuevo producto con los datos del cuerpo
    const newProduct = await service.create(body)
    // Responder con el nuevo producto y un código de estado 201 (Created)
    res.status(201).json({newProduct})
  });

  //Actualizar "PATCH"
  router.patch('/:id',
    // Llamamos al middleware validador con el schema getProduct y
    // la informacion proviene de los parametros
    validatorHandler(getProductSchema, 'params'),
    // Llamamos al middleware validador con el schema updateProduct y
    // la informacion proviene de los body
    validatorHandler(updateProductSchema, 'body'),
    async (req,res, next)=> {
        try{
        // Recuperar el parámetro 'id' de la URL
        const { id } = req.params
        // Recuperar los datos del cuerpo de la solicitud
        const body = req.body
        // Utilizar el servicio (service) para realizar una actualización parcial del producto
        const product = await service.update(id, body)
        // Responder con el producto actualizado en formato JSON
        res.json(product);
        }catch (error){
          next(error)
        }
    })

//Eliminar "DELETE"
router.delete('/:id', async (req, res) => {
  // Recuperar el parámetro 'id' de la URL
  const { id } = req.params;
  // Utilizar el servicio (service) para eliminar el producto
  const respuesta = await service.delete(id)
  res.json(respuesta);
});

// Exportar el enrutador para usarlo en otro archivo
module.exports = router;



