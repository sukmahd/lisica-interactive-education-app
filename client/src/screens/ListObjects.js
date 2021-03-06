import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	StatusBar,
	Alert
} from 'react-native';

import {
	ButtonSmall,
	ButtonBig,
	InputRounded
} from '../components/common';
import { set_word, remove_word } from '../actions'

class ListObjects extends Component {
	constructor(props) {
		super(props);

		this.state= {
			username: ''
		}
	}

	static navigationOptions = {
		header: null,
	}

	guessWord (labelName) {
		const { navigate } = this.props.navigation;
		this.props.hapus_kata(labelName)
		this.props.setWord(labelName)
		navigate('GuessScreen')
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
			topBtnContainerStyle
		} = styles;

		const { navigate } = this.props.navigation;
		const dataLabels = this.props.words

		console.log('ini adalah', dataLabels[0])

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
						onPress={() => navigate('MainMenuScreen')}
					>
						<Text>MAIN</Text>
					</ButtonSmall>
				</View>

				<View style={topContainerStyle}>
					<View style={imgContainerStyle}>
						<Image style={imageStyle} source={require('../assets/images/XMLID_730_.png')} />
					</View>
				</View>

				{ dataLabels[0] ?
					<View>
						<View style={bottomContainerStyle}>
							<ButtonBig
								onPress={ () => this.guessWord(dataLabels[0]) }
								backgroundColor="#7E7F9A"
							>
								<Text>{ dataLabels[0] }</Text>
							</ButtonBig>
						</View>

						{ dataLabels[1] ?
							<View style={bottomContainerStyle}>
								<ButtonBig
									onPress={ () => this.guessWord(dataLabels[1]) }
									backgroundColor="#7E7F9A"
								>
									<Text>{ dataLabels[1] }</Text>
								</ButtonBig>
							</View>
							:
							<Text></Text>
						}

						{ dataLabels[2] ?
							<View style={bottomContainerStyle}>
								<ButtonBig
									onPress={ () => this.guessWord(dataLabels[2]) }
									backgroundColor="#7E7F9A"
								>
									<Text>{ dataLabels[2] }</Text>
								</ButtonBig>
							</View>
							:
							<Text></Text>
						}
					</View>
					:
					<View>
						<View style={bottomContainerStyle}>
							<Text style={ styles.warningText }>No Object Found!</Text>
						</View>
						<View style={bottomContainerStyle}>
							<Text style={ styles.warningText }>Try Snapping a different object</Text>
						</View>
						<View style={bottomContainerStyle}>
							<ButtonBig
								onPress={ () => navigate('CameraComponentScreen') }
							>
								<Text>SNAP</Text>
							</ButtonBig>
						</View>
					</View>
				}

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
		backgroundColor: '#F9F8F8'
	},
	topContainerStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20
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
		marginTop: 20
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
	warningText: {
		color: '#ecf0f1',
		fontWeight: '900',
		fontSize: 20,
		marginBottom: 10
	}
}

const mapStateToProps = (state) => ({
	words: state.wordStore.words
})

const mapDispatchToProps = (dispatch) => ({
	setWord: (label) => dispatch(set_word(label)),
	hapus_kata: (label) => dispatch(remove_word(label))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListObjects);
