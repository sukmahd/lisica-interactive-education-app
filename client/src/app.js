import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'

import MainMenu from './screens/MainMenu';
import Test from './screens/test_voice'

const AppNavigator = StackNavigator({
	MainMenuScreen: { screen: MainMenu }
})

class App extends Component {
	render() {
		return(
			<Test />
		)
	}
}

export default App;