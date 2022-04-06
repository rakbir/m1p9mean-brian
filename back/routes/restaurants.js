var express=require('express')
var restaurants=express.Router();

const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');

mongoClient.connect(constants.url)
.then(client=>{
	const db=client.db(constants.db)
	const collection=db.collection("utilisateurs")	
	
	restaurants.get('/liste/:limit/:skip', function(req, res){
		// ajout paramètres /:limit/:skip dans url		
		var limite=parseInt(req.params.limit);
		var skip=parseInt(req.params.skip);
		console.log(limite)
		console.log(skip) 
		query={type:"resto"};
		collection.countDocuments(query).then(compte=>{
			collection.find(query)
			.project({type:1, nom:1,  mail:1, adresse:1, description:1})
			.limit(limite)
			.skip(skip)
			.toArray()
			.then(liste=>{
				console.log(liste)
				res.send({restaurants:liste, total:compte})
			}, err=>{
				console.log(err)
			})
		});
	})
	
	restaurants.post('/inscription', function(req, res){
		collection.insertOne(req.body)
		res.send("inscription terminée")
	})
	
	restaurants.get("/test/:id", function(req, res){
		collection.find({_id:t}).toArray()
		.then(results=>{
			res.send(results)
		})
	})
})
.catch(error=>{
	console.error(error)
})
module.exports=restaurants;