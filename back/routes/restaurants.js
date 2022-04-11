var express=require('express')
var restaurants=express.Router();
var objectId=require('mongodb').ObjectId;
const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');

mongoClient.connect(constants.url)
.then(client=>{
	const db=client.db(constants.db)
	const collection=db.collection("utilisateurs")
	restaurants.get('/info/:restaurant', function(req, res){
		var restaurant=new objectId(req.params.restaurant);	
		collection.findOne({_id:restaurant, type:"restaurant"})
		.then(result=>{
			if(result!=null){
				res.send({status:1, data:result});
			}else{
				res.send({status:0, message:"L'identifiant ne correspond à aucun restaurant"})
			}
		})
	})

	restaurants.get('/liste/:limit/:skip', function(req, res){
		var limite=parseInt(req.params.limit);
		var skip=parseInt(req.params.skip);
		query={type:"restaurant"};
		collection.countDocuments(query).then(compte=>{
			collection.find(query)
			.project({type:1, nom:1,  mail:1, adresse:1, description:1})
			.limit(limite)
			.skip(skip)
			.toArray()
			.then(liste=>{
				if(liste==null){
					res.send({status:0, message:"Contenu introuvable"})
				}
				res.send({status:1, data:{restaurants:liste, total:compte}})
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