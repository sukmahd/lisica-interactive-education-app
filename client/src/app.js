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

const AppNavigator = StackNavigator({
	ListObjectsScreen: { screen: ListObjects },
	GuessScreen: { screen: Guess },
	MainMenuScreen: { screen: MainMenu },
	GameOverScreen: { screen: GameOver },
	WrongScreen: { screen: Wrong },
	CorrectScreen: { screen: Correct },
	ParentOptionScreen: { screen: ParentOption }
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