import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { user_login, setModalHide } from '../actions';

import {
  InputRoundedBig,
  ButtonBig,
  ButtonSmall
} from '../components/common';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.user_masuk) {
      console.log('Data login bener')
      this.onLoginSuccess()
    } else {
      console.log('Ada kesalahan login, alias state user_uid kosong')
      this.onLoginFail()
    }
  }

  async onButtonPress() {
    const userEmail = this.state.email;
    const userPassword = this.state.password;

    this.props.pengguna_login(userEmail, userPassword);
    
    
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
    this.props.umpetin_modal()
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    })
  }

  renderFailLoginFeedback() {
    if (this.state.error) {
      return (
          <ButtonSmall
            width={260}
            marginBottom={20}
            onPress={() => this.tryToLoginAgain()}
          >
            <Text>{this.state.error}</Text>
          </ButtonSmall>
      )
    }
  }
  
  tryToLoginAgain() {
    this.setState({
      email: '',
      password: '',
      error: ''
    })
  }

  static navigationOptions = {
    header: null
  }

  render() {

    const {
      parentContainerStyle,
      textInputStyle,
      textInputContainerStyle,
      buttonStyle,
      topContainerStyle
    } = styles

    return (
      <KeyboardAvoidingView behavior="padding" style={parentContainerStyle} >

        <StatusBar
					hidden={true}
				/>

        <View style={topContainerStyle}>
					<ButtonSmall
						fontSize={14}
						width={90}
						onPress={() => this.props.umpetin_modal()}
					>
						<Text>CLOSE</Text>
					</ButtonSmall>
				</View>

        <View style={textInputContainerStyle}>
          <View style={textInputStyle}>
            <InputRoundedBig 
              placeholder="Your email here"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={textInputStyle}>
            <InputRoundedBig 
              placeholder="Your password here"
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </View>
        </View>
        
        
				
				

        <View style={buttonStyle}>
        {this.renderFailLoginFeedback()}
          <ButtonBig
            onPress={this.onButtonPress.bind(this)}
          >
            <Text>LOGIN</Text>
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
    backgroundColor: '#FEFDFF',
    borderRadius: 40
  },
  topContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingTop: 20,
		paddingLeft: 20
  },
  textInputContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 60
  },
  textInputStyle: {
    marginTop: 10,
    marginBottom: 10
  },
  buttonStyle: {
    marginBottom: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorTextStyle: {
		fontSize: 18,
		alignSelf: 'center',
    color: '#ff3b30',
    marginBottom: 20
	}
}

const mapStateToProps = (state) => {
	return {
    modal_visible: state.wordStore.modal_visible,
    user_masuk: state.wordStore.user_uid
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    pengguna_login: (email, password) => dispatch(user_login(email, password)),
    umpetin_modal: () => dispatch(setModalHide())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);