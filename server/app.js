'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lisica')

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
