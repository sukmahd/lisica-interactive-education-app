"use strict"
const firebase = require('firebase');

firebase.initializeApp({
			apiKey: 'AIzaSyAwcUWfZlYO32f-bt4NGiy1Gqn3f3nZY3I',
			authDomain: 'loginappreactnative.firebaseapp.com',
			databaseURL: 'https://loginappreactnative.firebaseio.com',
			projectId: 'loginappreactnative',
			storageBucket: 'loginappreactnative.appspot.com',
			messagingSenderId: '780713378147'
		});

// Register user controller
const registerUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(resp => {
			res.send(resp)
		})
		.catch(err => {
			res.send(err)
		})
}

// Login user controller
const loginUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(resp => {
			res.send(resp)
		})
		.catch(err => {
			res.send(err)
		})
}
	
const logoutUser = (req, res, next) => {
	
	firebase.auth().signOut()
		.then(resp => {
			res.send(resp)
		})
		.catch(err => {
			res.send(err)
		})
}
	
module.exports = {
	registerUser,
	loginUser,
	logoutUser
}