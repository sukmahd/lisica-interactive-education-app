'use strict'
const Record = require('../models/Record')

function getData(req,res) {
  console.log(req.params.id);
  Record.find({
    email: req.params.id
  })
  .then(resp => {
    console.log(resp);
    if(resp[0] == undefined){
      res.send({msg:'user not found'})
    }else {
      res.send(resp)
    }
  })
  .catch(err => {
    res.send(err)
  })
}

function postData(req,res) {
  Record.create({
    email: req.body.email,
    success: req.body.success,
    repeat: req.body.repeat,
    word: req.body.word,
    answer: req.body.answer
  })
  .then(resp => {
    res.send(resp)
  })
  .catch(err => {
    res.send(err)
  })
}

  module.exports = {
    getData,
    postData
  };
