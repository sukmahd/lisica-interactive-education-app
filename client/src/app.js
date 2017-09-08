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
import DetailGraph from './screens/DetailGraph';
import CameraComponent from './screens/CameraComponent';

const AppNavigator = StackNavigator({
	GuessScreen: { screen: Guess },
	ListObjectsScreen: { screen: ListObjects },
	MainMenuScreen: { screen: MainMenu },
	GameOverScreen: { screen: GameOver },
	WrongScreen: { screen: Wrong },
	CorrectScreen: { screen: Correct },
	ParentOptionScreen: { screen: ParentOption },
  CameraComponentScreen: { screen: CameraComponent },
	DetailGraphScreen: { screen: DetailGraph }
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
