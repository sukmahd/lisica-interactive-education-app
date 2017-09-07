'use strict'
const Record = require('../models/Record')

function getData() {
  Record.find({
    email: req.body.email
  })
  .then(res => {

  })
  .catch(err => {

  })
