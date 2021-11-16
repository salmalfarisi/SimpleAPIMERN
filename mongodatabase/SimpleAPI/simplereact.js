var path = require('path');
//var mongoUtil = require( 'mongoUtil' );
var mongoUtil = require(path.resolve( __dirname, "../databaseconfig.js" ));

const getAllData = (request, response) => {
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			var contoh = mongoUtil.getDb();
			try {
				contoh.collection('simplerestapi').find().toArray().then((result) => {
					if(err)
					{
						response.status(400).send({success:false, data:err})
					}
					response.status(200).send({success:true, data: result})
				});
			}
			catch (e) {
				response.status(400).send({success:false, data: e.message})
			}
		}
	);
}

const deleteDatabyId = (request, response) => {
	const data = request.params.id
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			var contoh = mongoUtil.getDb();
			try {
				var query = {'id': parseInt(data)};
				contoh.collection("simplerestapi").deleteOne(query, function(err, obj) {
					if(err)
					{
						response.status(400).send({success:false, data:err})
					}
					response.status(200).send({success:true, data: 'Data successfully deleted'})
				});
			}
			catch (e) {
				response.status(400).send({success:false, data: e.message})
			}
		}
	);
}

const storeData = (request, response) => {
	const { id, title, description } = request.body
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			var contoh = mongoUtil.getDb();
			try {
				var query = {'id': parseInt(id), 'title':title, 'description':description};
				contoh.collection("simplerestapi").insertOne(query, function(err, obj) {
					if(err)
					{
						response.status(400).send({success:false, data:err})
					}
					response.status(200).send({success:true, data: 'Data successfully created'})
				});
			}
			catch (e) {
				response.status(400).send({success:false, data: e.message})
			}
		}
	);
}

const updateDatabyId = (request, response) => {
	const id = request.params.id
	const { title, description } = request.body
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			var contoh = mongoUtil.getDb();
			try {
				var setvalue = {$set: {'title':title, 'description':description}};
				contoh.collection("simplerestapi").updateOne({'id':parseInt(id)}, setvalue, function(error, obj) {
					if(error)
					{
						response.status(400).send({success:false, data:error})
					}
					response.status(200).send({success:true, data: 'Data successfully updated'})
				});
			}
			catch (e) {
				response.status(400).send({success:false, data: e.message})
			}
		}
	);
}

const getDatabyId = (request, response) => {
	id = request.params.id;
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			var contoh = mongoUtil.getDb();
			try {
				contoh.collection('simplerestapi').find({'id':parseInt(id)}).toArray().then((result) => {
					if(err)
					{
						response.status(400).send({success:false, data:err})
					}
					response.status(200).send({success:true, data: result})
				});
			}
			catch (e) {
				response.status(400).send({success:false, data: e.message})
			}
		}
	);
}

module.exports = {
	getAllData,
	deleteDatabyId,
	storeData,
	updateDatabyId,
	getDatabyId,
}