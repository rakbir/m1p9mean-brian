var express=require('express')
var commandes=express.Router();
var bodyParser=require('body-parser')
const mongoClient=require('mongodb').MongoClient
const url=require('../constants').url;
var objectId=require('mongodb').ObjectId;

commandes.use(bodyParser.urlencoded({ extended: false }))
commandes.use(bodyParser.json());

mongoClient.connect(url).then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("commandes")

	commandes.get('/', function(req, res){
		const curs=collection.find().toArray()
		.then(results=>{
			res.send(results)
		})
		.catch(error=>console.error(error))
	})
	
	commandes.post('/nouveau', function(req, res){
		var plats=req.body.plats;
		var total=0;
		for(i=0; i<plats.length; i++){
			total=total+(plats[i].nombre * plats[i].prix)
		}
		var commande={
			client_id:req.body.client_id,
			plats:plats,
			commande_date:new Date(),
			etat:"en-cours"
		}
		collection.insertOne(commande)
		.then(result=>{
		res.send(result)
		})
	})

	
	commandes.get('/en-cours', function(req, res){
		collection.find({etat:"en-cours"}).toArray()
		.then(results=>{
			res.send(results)
		})
		.catch(error=>console.error(error))
	})
	
	commandes.put('/livraison/:id_commande', function(req, res){
		collection.findOneAndUpdate(
			{_id:new objectId(req.params.id_commande)},
			{
				$set:{
					etat:"livré",
					date_livraison:new Date()
				}
			}
		)
		.then(result=>{
			res.send(result)
		})
	})
})
.catch(error=>console.error(error))

module.exports=commandes;