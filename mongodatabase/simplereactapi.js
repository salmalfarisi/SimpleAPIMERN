var path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const tes = require(path.resolve(__dirname, "./tes.js"));
const simpleapi = require('./SimpleAPI/simplereact');

//install mongodb
var mongoUtil = require(path.resolve( __dirname, "./databaseconfig.js" ));

const app = express()

app.use(express.json())// add this line
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/tes/', tes.tes);

//CRUD Data
app.get('/', simpleapi.getAllData);
app.get('/:id', simpleapi.getDatabyId);
app.post('/store', simpleapi.storeData);
app.put('/update/:id', simpleapi.updateDatabyId);
app.delete('/delete/:id', simpleapi.deleteDatabyId);

app.listen(6666, () => {
	console.log("Server running on port 6666");
});