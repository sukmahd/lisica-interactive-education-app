import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

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
		title: 'Main menu',
		header: null
	}

	render() {
		const { 
			topContainerStyle,
			bottomContainerStyle,
			parentContainerStyle,
			imageStyle,
			midContainerStyle
		} = styles;

		return(
			<View style={parentContainerStyle}>

				<View style={topContainerStyle}>
					<ButtonSmall 
						backgroundColor='#ff85a5'
					>
						<Text>PARENT</Text>
					</ButtonSmall>
				</View>
				
				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/XMLID_2_.png')} />
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
					<ButtonBig>
						<Text>START</Text>
					</ButtonBig>
				</View>

			</View>
		)
	}
}

const styles = {
	parentContainerStyle: {
		flexDirection: 'column',
		flex: 1,
		marginTop: 20,
		backgroundColor: '#f4f9fc'
	},
	topContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingTop: 10,
		paddingRight: 10
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