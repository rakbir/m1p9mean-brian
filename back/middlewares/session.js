const mongoClient=require('mongodb').MongoClient
var objectId=require('mongodb').ObjectId;

mongoClient.connect(constants.url)
.then(client=>{
	
		client.db("meandb").collection("sessions").find('')
})
.catch(err=>{
	console.error(err)
})