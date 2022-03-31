const mongoClient=require('mongodb').MongoClient

function dbConnect(url){
	var cli;
	mongoClient.connect(url, (err, client)=>{
		if(err) return console.error(err)
		console.log("connected to database")
		cli = client
	})
	return cli;
}

exports.connect=dbConnect;