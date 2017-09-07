import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'

import { Header } from './components/common';
import DetailGraph from './screens/DetailGraph'

const AppNavigator = StackNavigator({
	DetailGraphScreen: { screen: DetailGraph }
})

class App extends Component {
	render() {
		return(
			<AppNavigator />
		)
	}
}

export default App;
