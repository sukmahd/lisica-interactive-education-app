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
						backgroundColor='#EB9486'
						onPress={() => navigate('ParentOptionScreen')}
					>
						<Text>PARENT</Text>
					</ButtonSmall>
				</View>

				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/lisica_logo.png')} />
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
						onPress={() => navigate('CameraComponentScreen')}
						backgroundColor="#66C3FF"
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
		backgroundColor: '#F9F8F8'
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
		alignItems: 'center',
		height: 200,
		width: 200
	},
	midContainerStyle: {
		marginTop: 60,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
}

export default MainMenu;
