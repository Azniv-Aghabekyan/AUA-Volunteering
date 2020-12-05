const express = require('express');
const bodyParser  = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();

var dbPath = 'db.json';
var fs = require('fs');

var db_json = [];

load_db_data = function() {
    db_json = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {});
})

app.get('/volunteers', function (req, res) {
  res.send({"volunteers":db_json});
})

app.post('/', function (req, res) {
  res.send({"message":"Sent"});
})

app.post('/volunteer', function (req, res) {
	db_json.push(req.body);
	fs.writeFileSync(dbPath, JSON.stringify(db_json));
	res.send({"message":"Added"});
})

app.listen(port, function () {
    console.log('Example app listening on port 8080!')
    load_db_data();
})
