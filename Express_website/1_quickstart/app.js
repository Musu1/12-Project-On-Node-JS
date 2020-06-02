var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

//Initialize out app
var app = express();

//Now we need to set body parser middle layer
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//create a route
app.get('/',function(req,res){
	console.log('Hello world'); //only on server side
	res.send('Hello World'); //for client side
})


app.listen(3000);
console.log('Server is running at port 3000');