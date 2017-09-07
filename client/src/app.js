import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'

import MainMenu from './screens/MainMenu';
import ParentOption from './screens/ParentOption';

const AppNavigator = StackNavigator({
	ParentOptionScreen: { screen: ParentOption },
	MainMenuScreen: { screen: MainMenu }
})

class App extends Component {
	render() {
		return(
			<AppNavigator />
		)
	}
}

export default App;