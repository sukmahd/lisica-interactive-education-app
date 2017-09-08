import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import { 
	ButtonSmall,
	ButtonBig, 
	InputRounded 
} from '../components/common';

class Guess extends Component {
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
			bottomContainerStyle,
			parentContainerStyle,
			imageStyle,
			midContainerStyle,
			textStyle,
			imgContainerStyle
		} = styles;

		return(
			<View behavior="padding" style={parentContainerStyle}>

				<StatusBar 
					hidden={true}
				/>

				

				<View style={topContainerStyle}>
					<View style={imgContainerStyle}>
						<Image style={imageStyle} source={require('../assets/images/XMLID_730_.png')} />
					</View>

					<ButtonSmall 
						backgroundColor='#ff85a5'
						onPress={() => navigate('ParentOptionScreen')}
					>
						<Text>DARI VOICE</Text>
					</ButtonSmall>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig>
						<Text>SPEAK!</Text>
					</ButtonBig>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig backgroundColor="#f14d38">
						<Text>SKIP</Text>
					</ButtonBig>
				</View>

			</View>
		)
	}
}

const styles = {
	imgContainerStyle: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		width: 280,
		flexDirection: 'row',
		marginBottom: 20,
		borderRadius: 50,
		borderWidth: 0.8,
		borderColor: '#d0e9ea'
	},
	parentContainerStyle: {
		flexDirection: 'column',
		flex: 1,
		backgroundColor: '#faf7eb'
	},
	topContainerStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 60
	},
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30
	},
	imageStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	midContainerStyle: {
		marginTop: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
}

export default Guess;