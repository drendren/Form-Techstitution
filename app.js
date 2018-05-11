var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 8080;
var Form = require('./Form.model');
var db = 'mongodb://localhost/form';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get('/',(req,res)=>{
	res.sendFile(__dirname + "/index.html");
});

app.get('/kerko.html',(req,res)=>{
	res.sendFile(__dirname + "/kerko.html");
});

app.get('/NewForm.html',(req,res)=>{
	res.sendFile(__dirname + "/NewForm.html");
});
app.get('/OldForm.html',(req,res)=>{
	res.sendFile(__dirname + "/OldForm.html");
});

app.get('/forms',function(req, res){
	Form.find().exec(function(err, forms){
		if (err) {
			res.send(err)
		}else {
			res.json(forms);
		}
	})
})

app.get('/forms/:id', function(req, res){
	Form.findOne({
		nrProkurorimit: req.params.id
	})
	.exec(function(err, form){
		if (err) {
			res.send(err)
		}else{
			res.json(form);
		}
	})
})

app.post('/form', function(req,res){
	Form.create(req.body, function(err, form){
		if (err) {
			res.send(err)
		}else {
			res.send(form);
		}
	})
})

app.put('/form/:id', function(req, res){
	Form.findOneAndUpdate({
		nrProkurorimit: req.params.id},
	{$set: {
		llojiProkurorimit: req.body.llojiProkurorimit,
		aktivitetiProkurorimit: req.body.aktivitetiProkurorimit,
		dataInicimit: req.body.dataInicimit,
		dataPublikimit: req.body.dataPublikimit,
		dataNenshkrimit: req.body.dataNenshkrimit,
		afatiPerImplementimin1: req.body.afatiPerImplementimin1,
		afatiPerImplementimin2: req.body.afatiPerImplementimin2,
		dataPermbylljes: req.body.dataPermbylljes,
		shumaEKontrates: req.body.shumaEKontrates,
		shumaTotale: req.body.shumaTotale,
		emriKontaktuesit: req.body.emriKontaktuesit,
		llojiKontrates: req.body.llojiKontrates,
		gjendjaEKontrates: req.body.gjendjaEKontrates,
		shpjegim: req.body.shpjegim
	}},{upsert: true},
	function(err, newForm){
		if (err) {
			res.send(err);
		}else {
			res.send(newForm);
		}
	});
});

app.delete('/form/:id', function(req, res){
	Form.findOneAndRemove(
	{nrProkurorimit: req.params.id},
	function(err, form){
		if (err) {
			res.send(err);
		}else {
			res.send(form);
		}
	})
})

app.listen(port, ()=>{
	console.log("app listening on port "+port);
});
