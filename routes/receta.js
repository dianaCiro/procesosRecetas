var express = require('express');
var router = express.Router();
var db= require('../queries/receta');

//asignar a cada ruta los metodos de la bd
router.get('/getAll',db.getAllReceta);
router.post('/create', db.createReceta);
router.delete('/remove/:id',db.removeReceta);
router.put('/update/:id', db.updateReceta);
//exportar modulo par aqu elo pueda leer
module.exports=router;

