import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'

import MainMenu from './screens/MainMenu';
import ParentOption from './screens/ParentOption';
import Correct from './screens/Correct';
import Wrong from './screens/Wrong';
import GameOver from './screens/GameOver';
import Guess from './screens/Guess';

const AppNavigator = StackNavigator({
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
			<AppNavigator />
		)
	}
}

export default App;