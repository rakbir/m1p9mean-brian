var express=require('express')
var commandes=express.Router();
const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');
var objectId=require('mongodb').ObjectId;
const middlewares=require('../middlewares/middlewares')

mongoClient.connect(constants.url).then(client=>{
	const db=client.db(constants.db)
	const collection=db.collection("commandes")
	
	commandes.get('/voir', middlewares.checkSession, middlewares.responsableOnly, function(req, res){
		var debut=req.query.debut+'T00:00:00.000+00:00';
		var fin=req.query.fin+'T23:59:59.999+00:00';
		console.log(debut, fin);
		const curs=collection.find(
			{
				commande_date:{
					$gte: new Date(debut),
					$lt: new Date(fin)
				}
			}).toArray()
		.then(results=>{
			console.log(results)
			res.send({status:1, data:results });
		})
		.catch(error=>console.error(error))
	})
	
	commandes.post('/nouveau', middlewares.checkSession, middlewares.clientOnly, function(req, res){
		var plat=req.body;
		var tot=plat.prix*plat.nombre;
		var commande={
			client:{ 
				id: req.session.user._id, 
				nom:req.session.user.nom,
				adresse:req.session.user.adresse
			},
			commande_date:new Date(),
			etat:"en-cours",
			restaurant:plat.restaurant,
			plat:{
				libelle:plat.libelle,
				prix:plat.prix,
				nombre:plat.nombre
			},
			total:tot
		}
		collection.insertOne(commande)
		.then(result=>{
			if(result.acknowledged){
				res.send({status:1, message:"Commande enregistrée"})
			}
		})
	})
		
	commandes.get('/en-cours', middlewares.checkSession, middlewares.restaurantOnly, function(req, res){
		console.log(req.session)
		var projection={restaurant:0};
		var query={etat:"en-cours", "restaurant.id":req.session.user._id}
		collection.find(query)
		.project(projection)
		.toArray()
		.then(results=>{
			res.send({status:1, data:results})
		})
		.catch(error=>console.error(error))
	})
	commandes.get('/prete-pour-livraison/:id_commande', middlewares.checkSession, middlewares.restaurantOnly, function(req, res){
		collection.findOneAndUpdate(
			{_id:new objectId(req.params.id_commande)},
			{
				$set:{
					etat:"prêt"
				}
			}
		)
		.then(result=>{
			if(result.lastErrorObject.updatedExisting && result.ok==1){			
				res.send({status:1, message:"Modifications enregistrées"})
			}
		})
	})
	commandes.get('/a-livrer', middlewares.checkSession, middlewares.livreurOnly, function(req, res){
		var projection={"plat.prix":0, total:0, commande_date:0};
		var query={etat:"prêt"}
		collection.find(query)
		.project(projection)
		.toArray()
		.then(results=>{
			res.send({status:1, data:results})
		})
		.catch(error=>console.error(error))
	})
	commandes.get('/livraison/:id_commande', middlewares.checkSession, middlewares.livreurOnly, function(req, res){
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
			if(result.lastErrorObject.updatedExisting && result.ok==1){			
				res.send({status:1, message:"Modifications enregistrées"})
			}
		})
	})
})
.catch(error=>console.error(error))

module.exports=commandes;