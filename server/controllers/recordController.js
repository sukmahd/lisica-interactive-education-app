'use strict'
const Record = require('../models/Record')

function getData(req,res) {
  Record.find({
    email: req.body.email
  })
  .then(resp => {
    res.send(resp)
  })
  .catch(err => {
    res.send(err)
  })
}

function postData(req,res) {
  Record.create({
    email: req.body.email
  })
  .then(resp => {
    res.send(resp)
  })
  .catch(err => {
    res.send(err)
  })
}

  module.exports = {
    getData
  };
