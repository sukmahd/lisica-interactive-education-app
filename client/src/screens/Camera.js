import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import { 
	ButtonSmall,
	ButtonBig, 
	InputRounded 
} from '../components/common';


class Correct extends Component {
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
			textStyle
		} = styles;

		const { navigate } = this.props.navigation;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar 
					hidden={true}
				/>

				
				
				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/XMLID_730_.png')} />
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig
						onPress={() => navigate('ListObjectsScreen')}
					>
						<Text>SNAP</Text>
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
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
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

export default Correct;