const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";

// list-list database
var _db;
var testlokal;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      // inisialisasi database yang ingin dipanggil
	  _db  = client.db('local');
      testlokal  = client.db('rentandgo');
	  
      return callback( err );
    } );
  },

  //variable yang bisa dipanggil oleh js luar
  getDb: function() {
	return _db;
  },
  getRentGo: function(){
	return testlokal;
  }
  
};