var express=require('express')
var livreurs=express.Router();

livreurs.get('/liste', function(req, res){
	res.send('Liste des livreurs')
})

livreurs.post('/modification', function(req, res){
	res.send('Modification livreur');
})

livreurs.post('/nouveau', function(req, res){
	res.send("inscription livreur")
})

module.exports=livreurs;