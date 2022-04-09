var express=require('express')
var clients=express.Router();
const bodyparser=require('body-parser')
const mongoClient=require('mongodb').MongoClient
const url=require('../constants').url;

var middlewares=require('../middlewares/middlewares')

clients.use(bodyparser.urlencoded({extended:true}))
clients.use(bodyparser.json())

mongoClient.connect(url)
.then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs") 
	
	clients.get('/search',
				middlewares.responsableOnly,
				function(req, res){
		const curs=collection.find().toArray()
		.then(results=>{
			res.send(results)
		})
		.catch(error=>console.error(error))
	})

	clients.get('/liste', function(req, res){
		collection.find({type:"client"}).toArray()
		.then(result=>{
			res.send(result)
		})
	})	
})
.catch(error=>console.error(error))


module.exports=clients;