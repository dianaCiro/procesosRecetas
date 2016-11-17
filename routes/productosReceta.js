var express = require('express');
var router = express.Router();
var db= require('../queries/productosReceta');

//asignar a cada ruta los metodos de la bd
router.get('/getAll',db.getAllInfoReceta);

module.exports=router;
