import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import MainMenu from './screens/MainMenu';
import Test from './screens/test_voice'
import Ngorte from './screens/text_to_voice_tts'
import ParentOption from './screens/ParentOption';
import Correct from './screens/Correct';
import Wrong from './screens/Wrong';
import GameOver from './screens/GameOver';
import store from './stores'
import Guess from './screens/Guess';
import ListObjects from './screens/ListObjects';
import Camera from './screens/Camera';
import DetailGraph from './screens/DetailGraph';
import CameraComponent from './screens/CameraComponent';
import Login from './screens/Login';

const AppNavigator = StackNavigator({
	MainMenuScreen: { screen: MainMenu },
	GuessScreen: { screen: Guess },
	CameraComponentScreen: { screen: CameraComponent },
	GameOverScreen: { screen: GameOver },
	ParentOptionScreen: { screen: ParentOption },
	LoginScreen: { screen: Login },
	DetailGraphScreen: { screen: DetailGraph },
	ListObjectsScreen: { screen: ListObjects },
	CorrectScreen: { screen: Correct },
	WrongScreen: { screen: Wrong },
	CameraScreen: { screen: Camera }
})

class App extends Component {
	render() {
		return(
			<Provider store={store}>
				<AppNavigator/>
			</Provider>
		)
	}
}

export default App;
