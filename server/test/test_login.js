const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const axios = require('axios');

chai.use(chaiHttp);

const $http = axios.create({
	baseURL: 'http://localhost:3000'
});

describe('GET: /login', () => {

	it('Should return success GET status' () => {
		return $http.post('/login')
			.then(response => {
				response.status.should.equal(200);
			})
		});
		
	it('Should return fail GET status, because there is no such endpoint' () => {
		return $http.post('/logins')
			.then(response => {
				response.status.should.equal(400);
			})
	});
	
	it(`Should return true because have 'email:' property`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('email').and.to.be.a('string');
		}) 
	})

	it(`Should return true because have 'email:' property and have '@'`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('email').and.have.string('@');
		}) 
	})
	
	it(`Should return true because have 'providerData:' property`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('providerData').and.to.be.an('array');
		})
	})

	it(`Should return true because have 'providerData:' property and have certain length`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('providerData').and.to.be.an('array').and.to.have.lengthOf(1);
		})
	})

	it(`Should return true because have 'emailVerified:' property and valued false`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('emailVerified').and.to.be.false;
		})
	})

	it(`Should return true because have 'displayName:' property and valued null because app doesn't allow full name`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('displayName').and.to.be.null;
		})
	})

	it(`Should return true because have 'La: and Lc' property and valued null`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('La').and.to.be.false;
			authState.should.have.property('Lc').and.to.be.false;
		})
	})

	it(`Should return true because have 'K:' property and have 0 length of array`, () => {
		return $http.post('/login')
		.then(response => {
			let authState = response.data;
			authState.should.have.property('K').and.to.be.an('array').that.is.empty;
		})
	})
});
