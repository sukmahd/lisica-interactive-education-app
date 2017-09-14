const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const axios = require('axios');

chai.use(chaiHttp);

const $http = axios.create({
	baseURL: 'http://reactchallengeapi.appspot.com'
});

describe('GET: /user/login', () => {

	it('Should return success GET status', () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
			.then(response => {
				response.status.should.equal(200);
			})
		});
		
	it('Should return fail GET status, because email or password is incorrect', () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'wR0n6_P4A55WoRd'
		})
			.catch(err => {
				let failAuthState = err.data;
				authState.should.have.property('message').and.to.be.a('string');
			})

	});
	
	it(`Should return true because have 'email:' property`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('email').and.to.be.a('string');
		}) 
	})

	it(`Should return true because have 'email:' property and have '@'`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('email').and.have.string('@');
		}) 
	})
	
	it(`Should return true because have 'providerData:' property`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('providerData').and.to.be.an('array');
		})
	})

	it(`Should return true because have 'providerData:' property and have certain length`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('providerData').and.to.be.an('array').and.to.have.lengthOf(1);
		})
	})

	it(`Should return true because have 'emailVerified:' property and valued false`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('emailVerified').and.to.be.false;
		})
	})

	it(`Should return true because have 'displayName:' property and valued null because app doesn't allow full name`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('displayName').and.to.be.null;
		})
	})

	it(`Should return true because have 'stsTokenManager:' property and is and object that contains importan objects`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data;
			authState.should.have.property('stsTokenManager').and.to.be.an('object')
		})
	})

	it(`Should return true because have 'apiKey: and accessToken:' property inside stsTokenManager object`, () => {
		return $http.post('/user/login', {
			email: 'adith@gmail.com',
			password: 'adith123'
		})
		.then(response => {
			let authState = response.data.stsTokenManager;
			authState.should.have.property('apiKey')
			authState.should.have.property('accessToken')
		})
	})

});


