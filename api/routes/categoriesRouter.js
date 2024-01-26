const express = require('express'); // Requerir libreria express

//Creación de un enrutador
const router = express.Router();

//Recuperar un productoen especifico de una categoria especifica
router.get('/:categoryId/products/:productId', (req,res) =>{
  //Recuperar parametros de id
  const { categoryId,productId } = req.params;
  //Respuesta del edpoint
  res.json({
    categoryId,
    productId,
  })
})

// Exportar el enrutador para usarlo en otro archivo
module.exports = router;
