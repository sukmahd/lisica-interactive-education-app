import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { set_word, remove_word,post_record } from '../actions'

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

	next_stage() {
		const { navigate } = this.props.navigation;
		this.props.save_data(this.props.word, false)
		this.props.hapus_kata(this.props.words[0])
		this.props.next_word(this.props.words[0])
		if(this.props.words.length == 0){
			navigate('GameOverScreen')
		}else {
			navigate('GuessScreen')
		}
	}

	static navigationOptions = {
		header: null,
	}
	render() {
		const { navigate } = this.props.navigation

		const {
			topContainerStyle,
			bottomContainerStyle,
			parentContainerStyle,
			imageStyle,
			midContainerStyle,
			textStyle
		} = styles;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar
					hidden={true}
				/>

				<View style={topContainerStyle}>
					<Text style={textStyle}>
						Oops! Not yet, buddy!
					</Text>
				</View>

				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/XMLID_615_.png')} />
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig onPress={() => navigate('GuessScreen')}>
						<Text>AGAIN</Text>
					</ButtonBig>
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig backgroundColor="#EB9486" onPress={() => this.next_stage()}>
						<Text>SKIP</Text>
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
	textStyle: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	bottomContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30
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
		save_data: (data, status) => dispatch(post_record(data, status)),
		hapus_kata: (data) => dispatch(remove_word(data)),
		next_word: (data) => dispatch(set_word(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Correct);
