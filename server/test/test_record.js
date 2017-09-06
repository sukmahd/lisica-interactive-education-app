'use strict'

const chai = require('chai')
const should = chai.should()
const axios = require('axios')

const $http = axios.create({
  baseURL: 'http://localhost:3000'
})


describe('GET route /records/:id', function() {
  it('test connect to endpoint return status OK', function() {
    return $http.get('/records/:id')
    .then(resp => {
      resp.status.should.equal(200)
    })
  })

  it('test API return an Array', function(){
    return $http.get('/records/:id')
    .then(resp => {
      resp.data.should.be.an('array')
    })
  })

  it('test API should not return an error ', function(){
    return $http.get('/records/asdasd')
    .catch(err => {
      should.not.exist(err)
    })
  })

  it('test API should return an array that have object property email',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].should.have.property('email')
    })
  })

  it('test API should return an array that have object property data',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].should.have.property('data')
    })
  })

  it('test API should return an array of object that have property data in array format',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].data.should.be.an('array')
    })
  })

  it('test API should send an error if not found',  function() {
    return $http.get('/recor')
    .then(res => {
      res.status.should.equal(404)
    })
  })

  it('test API should send an error if user not found',  function() {
    return $http.get('/records/asd231as')
    .then(res => {
      res.data.msg.should.equal('user not found')
    })
  })

  it('object data should have property success',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].data[0].should.have.property('success')
    })
  })

  it('object data should have property skip',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].data[0].should.have.property('skip')
    })
  })

  it('object data should have property repeat',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].data[0].should.have.property('repeat')
    })
  })

  it('object data should have property word',  function(){
    return $http.get('/records/:id')
    .then(res => {
      res.data[0].data[0].should.have.property('word')
    })
  })


})
