var express=require('express')
var restaurants=express.Router();

const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');

mongoClient.connect(constants.url)
.then(client=>{
	const db=client.db(constants.db)
	const collection=db.collection("utilisateurs")	
	
	restaurants.get('/', function(req, res){
		collection.find({type:"resto"}).toArray()
		.then(results=>{
			
			res.send(results)
		})
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