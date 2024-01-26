const { faker } = require('@faker-js/faker');//Importación de la dependencia
const boom =  require('@hapi/boom')//Importación de la biblioteca para manejar erroresHTTP

class ProductsService {

  //Generación del constructor
  constructor(){
    //inicializa un array vacio para alamacenar datos relacionados con productos y se guardaran en memoria
    this.products = [];
    //Cada vez que genere una instancia del servicio va  empezar a generar 100 productos
    this.generate();
  }

  //Generación de método
  generate(){
    //constante para que inicen en automatico con 100 productos
    const limit = 100;
    //Iteración para generar la cantidad establecida de la condición anterior  productos
    for(let index =0; index < limit; index++){
      //Agregar producto al array vacio
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  //Funcionalidad de crear
  async create(data){
    // Generar un nuevo ID único utilizando faker
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data //Agregar datos adicionales proporcionados en el parámetro 'data'
    }
    // Agregar el nuevo producto al array 'this.products'
    this.products.push(newProduct);
    //Devolver el nuevo producto creado
    return newProduct;
  }

// Función asíncrona para simular una operación de búsqueda
async find(){
    return new Promise((resolve, reject) => {
      // Simulando una operación de búsqueda que toma 5 segundos
      setTimeout(() => {
        // Resolviendo la Promesa con la lista de productos
        resolve(this.products);
      }, 1000);
    })
  }

  //Funcionalidad de buscar un solo elemento
  async findOne(id){
    // Utiliza el método `find` en el array `this.products`
   // para buscar un producto que tenga el ID igual al proporcionado
   const product = this.products.find(item => item.id === id);
    // Verificar si el producto fue encontrado
    if(!product){
      throw boom.notFound('Producto no encontrado');
    }
    if(product.isBlock){
      throw boom.conflict('Producto bloqueado');
    }
    return product;
  }

  //Funcionalidad para actualizar un elemento
  async update(id, changes){
    // Buscar el índice del producto en el array 'this.products'
    const index = this.products.findIndex(item => item.id === id);
    // Verificar si el producto con el ID proporcionado fue encontrado
    if(index === -1){
      // Utiliza boom.notFound para crear un error 404
      throw boom.notFound('Producto no encontrado');
    }
    // Obtener el producto actual
    const product = this.products[index];
    // Actualizar el producto aplicando los cambios
    this.products[index] = {
      ...product,
      ...changes
    };
    // Devolver el producto actualizado
    return this.products[index]
  }
  //Funcionalidad para borrar un elemento
  async delete(id){
    // Buscar el índice del producto en el array 'this.products'
    const index = this.products.findIndex(item => item.id === id);
    // Verificar si el producto con el ID proporcionado fue encontrado
    if (index === -1){
      // Si no se encuentra, lanzar un error
      // Utiliza boom.notFound para crear un error 404
      throw boom.notFound('Producto no encontrado')
    }
    // Eliminar el producto del array utilizando splice
    this.products.splice(index,1);
    // Devolver un objeto indicando que la eliminación fue exitosa
    return {message: "La eliminación fue exitosa",id};
  }
}
module.exports = ProductsService


