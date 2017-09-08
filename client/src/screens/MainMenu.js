import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import {
	ButtonSmall,
	ButtonBig,
	InputRounded
} from '../components/common';

class MainMenu extends Component {
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
			midContainerStyle
		} = styles;

		const { navigate } = this.props.navigation;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar
					hidden={true}
				/>

				<View style={topContainerStyle}>
					<ButtonSmall
						backgroundColor='#ff85a5'
						onPress={() => navigate('ParentOptionScreen')}
					>
						<Text>PARENT</Text>
					</ButtonSmall>
				</View>

				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/Eevee.png')} />
				</View>

				<View style={midContainerStyle}>
					<InputRounded
						label="Username"
						value={this.state.value}
						placeholder="Your username"
						secureTextEntry={false}
					/>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig
						onPress={() => navigate('CameraScreen')}
					>
						<Text>START</Text>
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
		backgroundColor: '#f4f9fc'
	},
	topContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingTop: 20,
		paddingRight: 20
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 52
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

export default MainMenu;
