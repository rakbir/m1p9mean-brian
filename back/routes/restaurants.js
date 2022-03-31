var express=require('express')
var restaurants=express.Router();

const bodyparser=require('body-parser')
const mongoClient=require('mongodb').MongoClient
const url=require('../constants').url;
restaurants.use(bodyparser.urlencoded({extended:true}))
restaurants.use(bodyparser.json())

mongoClient.connect(url)
.then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs")	

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