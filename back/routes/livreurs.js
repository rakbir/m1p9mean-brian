var express=require('express')
var livreurs=express.Router();

const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');

mongoClient.connect(constants.url)
.then(client=>{
	const db=client.db(constants.db)
	const collection=db.collection("utilisateurs")
	livreurs.get('/liste', function(req, res){
		collection.find({type:"livreur"})
		.toArray()
		.then(result=>{
			res.send({status:1, data:result})
		})
	})

	livreurs.post('/modification', function(req, res){
		res.send('Modification livreur');
	})

	livreurs.post('/nouveau', function(req, res){
		res.send("inscription livreur")
	})
})
.catch(error=>{
	console.error(error)
})
module.exports=livreurs;