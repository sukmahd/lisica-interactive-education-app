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

const MedalOfHonor = () => {
	return (
		<Image 
			style={{width: 70, height: 70}}
			resizeMode="contain"
			source={require('../assets/images/Medals.png')}
		/>
	)
}




class GameOver extends Component {
	constructor(props) {
		super(props);

		this.state= {
			username: '',
			medal_count: 0
		}
	}


	renderMedalCountText() {
		if (this.state.medal_count == 1) {
			return (
				<Text>
					One medal for you!
				</Text>
			)
		} else if (this.state.medal_count == 2) {
			return (
				<Text>
					Two medal for you!
				</Text>
			)
		} else if (this.state.medal_count == 3) {
			return (
				<Text>
				Three medal for you!
			</Text>
			)
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
			expTextStyle,
			achievementStyle,
			recordStyle,
			recordTextStyle,
			medalStyle
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

				<View >
					<View style={subTopContainerStyle}>
						{
							this.props.collections.map( (data, i) => {
								return (
									<View style={recordStyle} key={i}>
									<Text  style={expTextStyle}>
										{data.success ?  '+5 Exp!' : '+0 Exp'}
										
									</Text>
									<Text style={recordTextStyle}>
										<Text style={{fontWeight: 'bold'}}>Word: </Text>
										<Text style={{textDecorationLine: 'underline'}}>{data.word}</Text>
										, 
										<Text style={{fontWeight: 'bold'}}> Answer: </Text>
										<Text style={{textDecorationLine: 'underline'}}>{data.answer}</Text>
										, 
										<Text style={{fontWeight: 'bold'}}> Try: </Text>
										<Text style={{textDecorationLine: 'underline'}}>{data.repeat}</Text>
									</Text>


									</View>

									
									
								)
							})
						}
						
					</View>
					<View>
						
							{this.renderMedalCountText()}
						
					</View>
					<View style={medalStyle}>
						{
							this.props.collections.map( (data, idx) => {
								return (
									<View style={{
										height: 70
									}} key={idx}>
										
											{data.success ? <MedalOfHonor /> : <View />}
										
									</View>
								)
							})
						}
					</View>
					
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
		alignItems: 'center',
		backgroundColor: '#F9F8F8'
	},
	topContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 40
	},
	subTopContainerStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: 16,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: 'white',
		width: '95%',
		borderRadius: 20
	},
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	achievementStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	medalStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		marginTop: 20,
		marginBottom: 4
	},
	expTextStyle: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white'
	},
	recordTextStyle: {
		color: 'white'
	},
	recordStyle: {
		backgroundColor: '#7E7F9A',
		marginTop: 5,
		marginBottom: 5,
		padding: 10,
		borderRadius: 10
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
