'use strict'

const chai = require('chai')
const should = chai.should()
const axios = require('axios')

const $http = axios.create({
  baseURL: 'http://reactchallengeapi.appspot.com'
})


describe('GET route /records/:id', function() {
  it('test connect to endpoint return status OK', function() {
    return $http.get('/records/adit@gmail.com')
    .then(resp => {
      resp.status.should.equal(200)
    })
  })

  it('test API return an Array', function(){
    return $http.get('/records/adit@gmail.com')
    .then(resp => {
      resp.data.should.be.an('array')
    })
  })

  it('test API should not return an error ', function(){
    return $http.get('/records/adit@gmail.com')
    .catch(err => {
      should.not.exist(err)
    })
  })

  it('test API should return an array that have object property email',  function(){
    return $http.get('/records/adit@gmail.com')
    .then(res => {
      res.data[0].should.have.property('email')
    })
  })


  it('test API should send an error if user not found',  function() {
    return $http.get('/records/asd231as')
    .then(res => {
      res.data.msg.should.equal('user not found')
    })
  })

  it('object data should have property success',  function(){
    return $http.get('/records/adit@gmail.com')
    .then(res => {
      res.data[0].should.have.property('success')
    })
  })


  it('object data should have property repeat',  function(){
    return $http.get('/records/adit@gmail.com')
    .then(res => {
      res.data[0].should.have.property('repeat')
    })
  })

  it('object data should have property word',  function(){
    return $http.get('/records/adit@gmail.com')
    .then(res => {
      res.data[0].should.have.property('word')
    })
  })


})

describe('POST routes /records',  function() {
  it('it should return status OK 200', function() {
    return $http.post('/records', {
      email: 'adit@gmail.com',
      success: true,
      repeat: 1,
      word: 'ball',
      answer: 'ball'
    })
    .then(res => {
      res.status.should.equal(200)
    })
  })

  it('email required', function() {
    return $http.post('/records', {
      email: 'adit@gmail.com',
      success: true,
      repeat: 1,
      word: 'ball',
      answer: 'ball'
    })
    .then(res => {
      res.data.should.have.property('email')
    })
  })


  it('repeat required', function() {
    return $http.post('/records', {
      email: 'adit@gmail.com',
      success: true,
      repeat: 4,
      word: 'ball',
      answer: 'ball'
    })
    .then(res => {
      res.data.should.have.property('repeat')
    })
  })


  it('word required', function() {
    return $http.post('/records', {
      email: 'adit@gmail.com',
      success: true,
      repeat: 3,
      word: 'dadu',
      answer: 'ball'
    })
    .then(res => {
      res.data.should.have.property('word')
    })
  })

  it('success required', function() {
    return $http.post('/records', {
      email: 'adit@gmail.com',
      success: true,
      repeat: 3,
      word: 'dadu',
      answer: 'ball'
    })
    .then(res => {
      res.data.should.have.property('success')
    })
  })
})


describe('GET route /records/:id', function() {
  it('success connect and return data', function() {
    return $http.get('/records/adit@gmail.com')
    .then(res => {
      res.status.should.equal(200)
      res.data.should.be.an('array')
      res.data[0].should.have.property('email')
      res.data[0].should.have.property('success')
      res.data[0].should.have.property('repeat')
      res.data[0].should.have.property('word')
    })
  })
})
