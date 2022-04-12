var express=require('express')
var livreurs=express.Router();
const middlewares=require('../middlewares/middlewares')
const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');
var objectId=require('mongodb').ObjectId;


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

	livreurs.get('/liste/:limit/:skip', middlewares.checkSession, middlewares.responsableOnly, function(req, res){
		var limite=parseInt(req.params.limit);
		var skip=parseInt(req.params.skip);
		query={type:"livreur"};
		collection.countDocuments(query).then(compte=>{
			collection.find(query)
			.project({mdp:0})
			.limit(limite)
			.skip(skip)
			.toArray()
			.then(liste=>{
				if(liste==null){
					res.send({status:0, message:"Contenu introuvable"})
				}
				res.send({status:1, data:{livreurs:liste, total:compte}})
			}, err=>{
				console.log(err)
			})
		});
	}) //OK

	livreurs.get('/suppression/:id_livreur', middlewares.checkSession, middlewares.responsableOnly, function(req,res){
		var stat=1; var msg="Modifications enregistrées";
		var livreur=new objectId(req.params.id_livreur);
		collection.deleteOne({_id: livreur, type:"livreur"})
		.then(result=>{
			if(!result.acknowledged && !deleteCount==1){
				stat=0; msg="Il semblerait que le compte soit introuvable";
			}
			res.send({status:stat, message:msg})
		})
		.catch(error=>console.error(error))
	}) //ok
})
.catch(error=>{
	console.error(error)
})
module.exports=livreurs;