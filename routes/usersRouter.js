const express = require('express'); // Requerir libreria express

//Creación de un enrutador
const router = express.Router();

//Creación de una nueva ruta para el query parametros
router.get('/', (req,res) => {
  //Recuperación de parametros limit y offset
  const { limit, offset } = req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send('No hay parametros')
  }
})

// Exportar el enrutador para usarlo en otro archivo
module.exports = router;

