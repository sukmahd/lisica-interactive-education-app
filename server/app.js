'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://sukmahd:vongola12@cluster0-shard-00-00-h9kzb.mongodb.net:27017,cluster0-shard-00-01-h9kzb.mongodb.net:27017,cluster0-shard-00-02-h9kzb.mongodb.net:27017/lisica?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
mongoose.connect(url)

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const user = require('./routes/user')
const record = require('./routes/records')

app.use('/user', user)
app.use('/records', record)

app.get('/', (req,res) => {
  res.send('hai')
})


app.listen(3000, function() {
	console.log('Listening on port 3000')
});
