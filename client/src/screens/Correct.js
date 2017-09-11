import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { set_word, game_over, remove_word } from '../actions'

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
			textStyle
		} = styles;

		return(
			<KeyboardAvoidingView behavior="padding" style={parentContainerStyle}>

				<StatusBar
					hidden={true}
				/>

				<View style={topContainerStyle}>
					<Text style={textStyle}>
						Yeay! You got it!
					</Text>
				</View>

				<View style={midContainerStyle}>
					<Image style={imageStyle} source={require('../assets/images/XMLID_730_.png')} />
				</View>

				<View style={bottomContainerStyle}>
					<ButtonBig 
						onPress={() => this.next_stage()}
					>
						<Text>NEXT</Text>
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
const mapStateToProps = (state) => {
	return {
		words: state.wordStore.words,
		count: state.wordStore.count,
		word: state.wordStore.word,
		game: state.wordStore.game
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		next_word: (data) => dispatch(set_word(data)),
		game_over: () => dispatch(game_over()),
		hapus_kata: (data) => dispatch(remove_word(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Correct);
