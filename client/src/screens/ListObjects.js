import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import {
	ButtonSmall,
	ButtonBig,
	InputRounded
} from '../components/common';

class ListObjects extends Component {
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
			imgContainerStyle,
			topBtnContainerStyle
		} = styles;

		const { navigate } = this.props.navigation;
		const dataLabels = this.props.navigation.state.params.labels

		return(
			<View behavior="padding" style={parentContainerStyle}>

				<StatusBar
					hidden={true}
				/>

				<View style={topBtnContainerStyle}>
					<ButtonSmall
						backgroundColor='#ff85a5'
						fontSize={14}
						width={80}
						onPress={() => navigate('MainMenuScreen')}
					>
						<Text>MAIN</Text>
					</ButtonSmall>
				</View>

				<View style={topContainerStyle}>
					<View style={imgContainerStyle}>
						<Image style={imageStyle} source={require('../assets/images/XMLID_730_.png')} />
					</View>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig
						onPress={() => navigate('GuessScreen')}
					>
						<Text>{ dataLabels[0].Name }</Text>
					</ButtonBig>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig>
						<Text>{ dataLabels[1].Name }</Text>
					</ButtonBig>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig>
						<Text>{ dataLabels[2].Name }</Text>
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
		marginTop: 20
	},
	topBtnContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingTop: 20,
		paddingLeft: 20
	},
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
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

export default ListObjects;
