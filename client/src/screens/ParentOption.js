import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import { 
	ButtonSmall,
	ButtonBig, 
	InputRounded 
} from '../components/common';

class ParentOption extends Component {
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
			midContainerStyle
		} = styles;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar 
					hidden={true}
				/>

				<View style={topContainerStyle}>
					<ButtonSmall 
						backgroundColor='#ff85a5'
						fontSize={14}
						width={80}
					>
						<Text>BACK</Text>
					</ButtonSmall>
				</View>
				
				<View style={midContainerStyle}>
					<View style={bottomContainerStyle}>
						<ButtonBig>
							<Text>LOG IN</Text>
						</ButtonBig>
					</View>

					<View style={bottomContainerStyle}>
						<ButtonBig>
							<Text>KID'S DATA</Text>
						</ButtonBig>
					</View>
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
		justifyContent: 'flex-start',
		paddingTop: 20,
		paddingLeft: 20
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30
	},
	midContainerStyle: {
		marginTop: 80
	}
}

export default ParentOption;