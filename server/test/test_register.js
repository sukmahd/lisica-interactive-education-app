'use strict'

const chai = require('chai')
const assert = chai.assert
const axios = require('axios')

const $http = axios.create({
  baseURL: 'http://reactchallengeapi.appspot.com//user'
})

describe("GET method on route /register", () => {
  it("Connect status 200 OK-oce", () => {
    return $http.post('/register', { email: 'email@email.com', password:'k7u8ii' })
    .then(resp => {
      assert.equal(resp.status, 200)
    })
  })

  it("It should have email field", () => {
    return $http.post('/register', { password:'k7u8ii' })
    .then(resp => {
      assert.equal(resp.data.msg, 'Should have email')
    })
  })

  it("It should have password field", () => {
    return $http.post('/register', { email: 'email@email.com' })
    .then(resp => {
      assert.equal(resp.data.msg, 'Should have password')
    })
  })

  it("It should have email field & password field", () => {
    return $http.post('/register', {})
    .then(resp => {
      assert.equal(resp.data.msg, 'Should have email & password')
    })
  })

  it("Email should use email format", () => {
    return $http.post('/register', { email: 'email.com', password:'k7u8ii' })
    .then(resp => {
      assert.equal(resp.data.message, 'The email address is badly formatted.')
    })
  })

  it("Password should be at least 6 character", () => {
    return $http.post('/register', { email: 'email@email.com', password:'i' })
    .then(resp => {
      assert.equal(resp.data.message, 'Password should be at least 6 characters')
    })
  })

  it("Email should be string", () => {
    return $http.post('/register', { email: 3, password:'k7u8ii' })
    .then(resp => {
      assert.equal(resp.data.msg, 'Email should be of string data type')
    })
  })

  it("Password should be string", () => {
    return $http.post('/register', { email: 'email@email.com', password: 9 })
    .then(resp => {
      assert.equal(resp.data.msg, 'Password should be of string data type')
    })
  })

  // it("", () => {
  //   return $http.post('/register', { email: 'email@email.com', password:'k7u8ii' })
  //   .then(resp => {
  //
  //   })
  // })
})
