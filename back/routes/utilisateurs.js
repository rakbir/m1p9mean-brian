var express=require('express')
var utilisateurs=express.Router();

const mongoClient=require('mongodb').MongoClient
const url=require('../constants').url;

mongoClient.connect(url)
.then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs")
	
	utilisateurs.get('/', function(req, res){
		const curs=collection.find().toArray()
		.then(results=>{
			console.log(results);
			res.send(results)
		})
		.catch(error=>console.error(error))
	})

	utilisateurs.post('/inscription', function(req, res){
		collection.insertMany(
		[
		{
			nom:"Resto galasam",
			adresse:"Ambatofotsy ambadiky ny gara",
			description:"sakafo malagasy",
			type:"resto",
			mail:"restogalasam@gmail.com",
			mdp:"123456"
		},
		{
			nom:"Gasy kaly",
			adresse:"Ambany sapin",
			type:"resto",
			mail:"gkaly@gmail.com",
			mdp:"123456"
		},
		{
			nom:"Resto galasam",
			adresse:"Ambatofotsy ambadiky ny gara",
			type:"resto",
			mail:"restogalasam@gmail.com",
			mdp:"123456"
		},
		{
			nom:"Rakoto",
			prenom:"Jean",
			type:"livreur",
			mail:"jrak@gmail.com",
			mdp:"123456"
		}
		])
		res.send("inscription terminée")
	})
})
.catch(error=>console.error(error))


module.exports=utilisateurs;