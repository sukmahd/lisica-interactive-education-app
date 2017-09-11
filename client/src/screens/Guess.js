import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';

import Tts from 'react-native-tts';
import Voice from 'react-native-voice';
import { connect } from 'react-redux'
import { set_word, remove_word, set_answer } from '../actions'

import {
	ButtonSmall,
	ButtonBig,
	InputRounded,
	Spinner
} from '../components/common';

class Guess extends Component {
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
			status: ''
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


  ngomong(word){
    Tts.speak(word);
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
		const word = e.value.filter( kata => {
			return this.props.word.toLowerCase() == kata.toLowerCase()
		})
    this.setState({
      results: e.value,
			status: word,
			started: false
    });

		this.props.set_answer(this.state.status)

		if(this.state.status[0])
		{
			navigate('CorrectScreen')
		}else {
			navigate('WrongScreen')
		}

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

	next_stage() {
		const { navigate } = this.props.navigation;
		this.props.hapus_kata(this.props.words[0])
		this.props.next_word(this.props.words[0])
		if(this.props.words.length == 0){
			navigate('GameOverScreen')
		}else {
			navigate('GuessScreen')
		}
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
			topBtnContainerStyle,
			guessAnswerStyle
		} = styles;

		const { navigate } = this.props.navigation;

		return(
			<View behavior="padding" style={parentContainerStyle}>

				<StatusBar
					hidden={true}
				/>

				<View style={topBtnContainerStyle}>
					<ButtonSmall
						backgroundColor='#EB9486'
						fontSize={14}
						width={80}
						onPress={() => navigate('ListObjectsScreen')}
					>
						<Text>BACK</Text>
					</ButtonSmall>
				</View>

				<View style={topContainerStyle}>
					<View style={imgContainerStyle}>
						<Image style={imageStyle} source={require('../assets/images/XMLID_730_.png')} />
					</View>
					{this.state.end ? <Spinner feedback="Processing..."/> : <View style={guessAnswerStyle}>
						<ButtonSmall
							backgroundColor='#7E7F9A'
							onPress={() => this.ngomong(this.props.word)}
							width={260}
						>
							<Text>🔊 {this.props.word}</Text>
						</ButtonSmall>

					</View>}
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig
            onPress={this._startRecognizing.bind(this)}
						backgroundColor="#66C3FF"
					>
						{this.state.started ? <Text>Listening</Text> : <Text>SPEAK!</Text>}
						<Text>{this.state.results[0]}</Text>
					</ButtonBig>

				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig onPress={() => this.next_stage()} backgroundColor="#EB9486">
						<Text>SKIP</Text>
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
		backgroundColor: '#272838'
	},
	topContainerStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20
	},
	guessAnswerStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
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
		marginTop: 16
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

const mapStateToProps = (state) => {
	return {
		game: state.wordStore.game,
		count: state.wordStore.count,
		words: state.wordStore.words,
		word: state.wordStore.word
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		hapus_kata: (data) => dispatch(remove_word(data)),
		next_word: (data) => dispatch(set_word(data)),
		set_answer: (data) => dispatch(set_answer(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Guess);
