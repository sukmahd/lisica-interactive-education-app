import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar, Modal, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import {
	ButtonSmall,
	ButtonBig,
	InputRounded
} from '../components/common';

class ParentOption extends Component {
	constructor(props) {
		super(props);

		this.state= {
			username: '',
			modalVisible: false
		}
	}

	static navigationOptions = {
		header: null,
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		const {
			topContainerStyle,
			bottomContainerStyle,
			parentContainerStyle,
			midContainerStyle
		} = styles;

		const { navigate } = this.props.navigation;
		const backAction = NavigationActions.back({
			key: null
		})

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar
					hidden={true}
				/>

				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {alert("Modal has been closed.")}}
				>
					<View style={{
						marginTop: 22,
						height: '80%'
						}}
					>
						<View>
							<Text>Hello World!</Text>

							<TouchableHighlight onPress={() => {
							this.setModalVisible(!this.state.modalVisible)
							}}>
							<Text>Hide Modal</Text>
							</TouchableHighlight>

						</View>
					</View>
				</Modal>

				<View style={topContainerStyle}>
					<ButtonSmall
						fontSize={14}
						width={80}
						onPress={() => this.props.navigation.dispatch(backAction)}
					>
						<Text>MAIN</Text>
					</ButtonSmall>
				</View>

				<View style={midContainerStyle}>
					<View style={bottomContainerStyle}>
						<ButtonBig
						onPress={() => this.setModalVisible(true)}
						>
							<Text>LOG IN</Text>
						</ButtonBig>
					</View>

					<View style={bottomContainerStyle}>
						<ButtonBig
							onPress={ () => navigate('DetailGraphScreen') }
						>
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
		backgroundColor: '#F9F8F8'
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
