const constants=require('./constants');
const mongoClient = require('mongodb').MongoClient;

var mongoclient=new mongoClient(constants.url)
mongoclient.connect()

// mongoClient.connect()

// mongoClient.db("meandb").collection("utilisateurs").find().toArray().then(results=>{
	// console.log("1", results)
	// mongoClient.close()
// })


module.exports=mongoclient;