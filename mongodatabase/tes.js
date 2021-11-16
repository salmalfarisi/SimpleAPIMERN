var path = require('path');
//var mongoUtil = require( 'mongoUtil' );
var mongoUtil = require(path.resolve( __dirname, "./databaseconfig.js" ));

const tes = (request, response) => {
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			var contoh = mongoUtil.getRentGo();
			test = contoh.collection('user').find().toArray().then((result) => {
				response.status(200).send({success:true, data: result})
			});
		}
	);
}

const tes2 = (request, response) => {
	mongoUtil.connectToServer( 
		function( err, client ){
			if (err){
				response.status(400).send({success:false, data: err})
			};
			//console.log('berhasil')
			var db = mongoUtil.getDb();
			db.collection('contohdatalokal').find({'statushapus':false}).toArray().then((result) => {
				response.status(200).send({success:true, data: result})
			});
		}
	);
}

module.exports = {
	tes,
	tes2,
}