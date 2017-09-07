import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Header } from './components/common';
import AudioExample from './test_voice'

class App extends Component {
	render() {
		return(
				<AudioExample/>
		)
	}
}

export default App;