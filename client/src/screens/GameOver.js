import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { reset_game } from '../actions'

import Sound from 'react-native-sound';

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

	endSoundFunc () {
		var endSound = new Sound('over_1.mp3', Sound.MAIN_BUNDLE, (error) => {
		  if (error) {
		    console.log('failed to load the sound', error);
		    return;
		  }
		  // loaded successfully
		  console.log('volume' + endSound.getVolume() + ' duration in seconds: ' + endSound.getDuration() + 'number of channels: ' + endSound.getNumberOfChannels());

			endSound.setVolume(1)

			// Play the sound with an onEnd callback
			endSound.play((success) => {
			  if (success) {
			    console.log('successfully finished playing');
			  } else {
			    console.log('playback failed due to audio decoding errors');
			    // reset the player to its uninitialized state (android only)
			    // this is the only option to recover after an error occured and use the player again
			    endSound.reset();
			  }
			});
		});
	}

	reset_game(direction) {
		const { navigate } = this.props.navigation
		this.props.reset()

		navigate(direction)
	}

	componentWillMount () {
		this.endSoundFunc()
	}

	render() {
		console.log(this.props.collections);
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

		const { navigate } = this.props.navigation

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
					{
						this.props.collections.map( (data, i) => {
							return (<Text key={i} style={subTextStyle}>
								{data.success ?  '+5 Exp!' : '+0 Exp'}
								word: {data.word}, answer: {data.answer}, repeat: {data.repeat}
							</Text>)
						})
					}
				</View>

				{/* <View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/Medals.png')} />
				</View> */}

				<View style={bottomContainerStyle}>
					<ButtonBig onPress={() => this.reset_game('CameraComponentScreen')}>
						<Text>AGAIN!</Text>
					</ButtonBig>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig onPress={() => this.reset_game('MainMenuScreen')} backgroundColor="#EB9486" >
						<Text>MAIN MENU!</Text>
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
		justifyContent: 'center',
		marginTop: 60
	},
	subTopContainerStyle: {
		flexDirection: 'column',
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
		marginTop: 16
	},
	imageStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	midContainerStyle: {
		marginTop: 40,
		marginBottom: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
}

const mapStateToProps = (state) => {
	return {
		collections: state.wordStore.collections
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reset: () => dispatch(reset_game())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
