import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import { 
	ButtonSmall,
	ButtonBig, 
	InputRounded 
} from '../components/common';

class GameOver extends Component {
	constructor(props) {
		super(props);

		this.state= {
			username: ''
		}
	}

	static navigationOptions = {
		header: null,
	}

	render() {
		const { 
			topContainerStyle,
			subTopContainerStyle,
			bottomContainerStyle,
			parentContainerStyle,
			imageStyle,
			midContainerStyle,
			textStyle,
			subTextStyle
		} = styles;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar 
					hidden={true}
				/>

				<View style={topContainerStyle}>
					<Text style={textStyle}>
						Congrats, buddy!
					</Text>
				</View>

				<View style={subTopContainerStyle}>
					<Text style={subTextStyle}>
						+5 Exp!
					</Text>
				</View>
				
				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/Medals.png')} />
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig>
						<Text>NEXT</Text>
					</ButtonBig>
				</View>

			</KeyboardAvoidingView>
		)
	}
}

const styles = {
	parentContainerStyle: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: '#faf7eb'
	},
	topContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 60
	},
	subTopContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16
	},
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	subTextStyle: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 90
	},
	imageStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	midContainerStyle: {
		marginTop: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
}

export default GameOver;