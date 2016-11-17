//archivo donde se almacenarán todos los métodos para la base de datos

//importar modulo promise
var promise=require('bluebird');//controlar promesas
//variable de opcioens que servirá para la base de datos
var options={
	promiseLib: promise
};
//cargar modelo pg promise
var pgp = require('pg-promise')(options);
//string de conexion
var connectionString='postgres://ifeseuwa:R0watSjqiBf3D6jyzHsnejXb8JtZvUka@elmer.db.elephantsql.com:5432/ifeseuwa';
//cargar bd 
var db = pgp(connectionString);

//metodos 
//obtener todoslso restauratnes
function getAllReceta(req, res, next){
	db.any('select *from receta')
	.then(function(data){
		res.status(200)//mandar esa informacion en archivo json
		.json({
			
			data: data
		});

	})
	.catch(function(err){
		return next(err);
	});

};


function createReceta(req, res, next){
	
	db.any('insert into receta(nombre,preparacion,dificultad,enfermedad,etapa,imagen)' + ' values($1,$2,$3,$4,$5,$6)',
		[req.body.nombre, req.body.preparacion,req.body.dificultad, req.body.enfermedad,req.body.etapa, req.body.imagen])
	.then(function(data){
	res.status(200)
	.json({
		
		data: data
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function removeReceta(req, res, next){

	var recetaId = parseInt(req.params.id);//ubicacion del paratmetro
	db.result('delete  from menu where id = $1', recetaId)
	.then(function(){
	res.status(200)
	.json({
		
		data: data
	});
	})
	.catch(function(err){
		return next(err);
		});

};

function updateReceta(req, res, next){
	db.none('update receta set  nombre=$1,preparacion=$2,dificultad=$3,enfermedad=$4,etapa=$5,imagen=$6 where id=$7 '),
	[parseInt(req.body.id), req.body.nombre, req.body.preparacion,req.body.dificultad,
	 req.body.enfermedad, req.body.etapa, req.body.imagen]
	.then(function(){
	res.status(200)
	.json({
		status: 'Exitoso',
		message: 'receta actualizada'
	});
	})
	.catch(function(err){
		return next(err);
		});

};


module.exports = {
	getAllReceta : getAllReceta,
	createReceta : createReceta,
	removeReceta : removeReceta,
	updateReceta : updateReceta
}