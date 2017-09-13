import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import Tts from 'react-native-tts'
import Voice from 'react-native-voice';
import { connect } from 'react-redux'
import { set_username } from '../actions'
import {
	ButtonSmall,
	ButtonBig,
	InputRounded
} from '../components/common';

class MainMenu extends Component {
	constructor(props) {
    super(props);
    this.state = {
      recognized: false,
      pitch: '',
      error: '',
      end: false,
      started: '',
      results: [],
      partialResults: [],
			username: 'Lisica',
			status: '',
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
  }

	static navigationOptions = {
		header: null,
	}

	onSpeechStart(e) {
    this.setState({
      started: true,
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: true,
    });
  }
  onSpeechEnd(e) {
    this.setState({
      end: true,
    });
  }
  onSpeechError(e) {
    this.setState({
      error: e.error,
    });
  }
  onSpeechResults(e) {
		const { navigate } = this.props.navigation
		if(e.value){
			this.setState({
				end:true
			})
		}
    this.setState({
      results: e.value,
			started: false,
			status: e.value[0]
    });

		this.props.set_user(e.value[0])

  }
  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
    });
  }
  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }
  _startRecognizing(e) {
    this.setState({
      recognized: false,
      pitch: '',
      error: '',
      started: false,
      results: [],
      partialResults: [],
			status: '',
			end:false
    });
    const error = Voice.start('en');
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _stopRecognizing(e) {
    const error = Voice.stop();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _cancelRecognizing(e) {
    const error = Voice.cancel();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _destroyRecognizer(e) {
    const error = Voice.destroy();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

	tell_your_name() {
		this.props.set_user('')
		Tts.speak('Hello, i am Lisica, What is your name?');
		Tts.addEventListener('tts-finish', (event) => {
			console.log('masuk');
			if(!this.props.username){
				this._startRecognizing(this)
			}
		});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.username){
			Tts.speak(`hai, ${nextProps.username}`)
		}
	}

	handleUsername(e){
		this.setState({
			status: e
		})
	}

	start_game(){
		const { navigate } = this.props.navigation;
		this.props.set_user(this.state.status)
		navigate('CameraComponentScreen')
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
						value={this.state.status}
						placeholder="Your username"
						onChangeText= {(val) => this.handleUsername(val)}
						secureTextEntry={false}
					/>

					<ButtonSmall
						backgroundColor='#FE5F55'
						width={40}
						height={40}
						marginLeft={20}
						onPress={() => this.tell_your_name()}
					>
						<Text></Text>
					</ButtonSmall>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig
						onPress={() => this.start_game()}
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

const mapStateToProps = (state) => {
	return {
		username: state.wordStore.username
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		set_user: (name) => dispatch(set_username(name))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
