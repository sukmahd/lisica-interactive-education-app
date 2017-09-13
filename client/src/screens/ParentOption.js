import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, KeyboardAvoidingView, StatusBar, Modal, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Login from '../screens/Login';
import {
	ButtonSmall,
	ButtonBig,
	InputRounded
} from '../components/common';
import { setModalVisible, loggingUserOut } from '../actions';

StatusBar.setHidden(true);

class ParentOption extends Component {
	constructor(props) {
		super(props);

		this.state= {
			username: ''
		}
	}

	renderLoginOrLogoutButton() {
		if (this.props.user_masuk) {
			return (
				<ButtonBig
				onPress={() => this.props.user_keluar()}
				>
					<Text>LOG OUT</Text>
				</ButtonBig>
			)
		} else {
			
			return (
				<ButtonBig
				onPress={() => this.props.munculin_modal()}
				>
					<Text>LOG IN</Text>
				</ButtonBig>
			)
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
					transparent={true}
					visible={this.props.modal_visible}
					onRequestClose={() => {alert("Modal has been closed.")}}
					hidden={true}
				>

					<StatusBar
						hidden={true}
					/>

				<View 
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(249,248,248,0.9)'
					}}
				>
					<StatusBar
						hidden={true}
					/>
					<View style={{
							width: '90%',
							height: '70%'
							
						}}
					>

						<StatusBar
							hidden={true}
						/>

						<Login />
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
						{this.renderLoginOrLogoutButton()}
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
		paddingTop: 30,
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

const mapStateToProps = (state) => {
	return {
		modal_visible: state.wordStore.modal_visible,
		user_masuk: state.wordStore.user_uid,
		collections: state.wordStore.collections
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		munculin_modal: () => dispatch(setModalVisible()),
		user_keluar: () => dispatch(loggingUserOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentOption);
