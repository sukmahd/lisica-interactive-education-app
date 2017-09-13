import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ToastAndroid,
  Button
} from 'react-native';

import Tts from 'react-native-tts';
import Voice from 'react-native-voice';

class VoiceTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      track: 0,
      testing: '',
      status: '...'
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
    Voice.isRecognizing = this.test.bind(this)
  }

  test(e){
    this.setState({
      testing: 'done'
    })
  }

  ngomong(word){
    // for(i = 0; i < word.length; i++) {
    //   Tts.speak(word[i]);
    // }

    Tts.speak(word);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
      status: 'started'
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      status: "onSpeechRecognized",
      recognized: '√',
    });
  }
  onSpeechEnd(e) {
    this.setState({
      status: "onSpeechEnd",
      end: '√',
      track: 0,
      loader: false
    });
  }
  onSpeechError(e) {
    this.setState({
      status: "onSpeechError",
      error: e.error,
    });
  }
  onSpeechResults(e) {
    this.setState({
      status: "onSpeechResults",
      results: e.value,
    });
  }
  onSpeechPartialResults(e) {
    this.setState({
      status: "onSpeechPartialResults",
      partialResults: e.value,
    });
  }
  onSpeechVolumeChanged(e) {
    let currentTrack = this.state.track
    if(e.value === 10){
      currentTrack += 1
      this.setState({
        status: "onSpeechVolumeChanged",
        track: currentTrack
      })
    }
    if(currentTrack > 1){
      loader: true
    }
    this.setState({
      pitch: e.value,
    });
  }
  _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Voice! {this.state.testing}
          {this.state.track > 1 ? 'loading...' : ' '}
        </Text>
        <Text style={{fontSize: 40}}>{`STATUS: ${this.state.status}`}</Text>
        {this.state.results.map((result, index) => {
          return (
            <Button key={`partial-result-${index}`} onPress={() => this.ngomong(result)} title={result} />
          )
        })}
        <Text
          style={styles.stat}>
          Partial Results
        </Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text
              key={`partial-result-${index}`}
              style={styles.stat}>
              {result}
            </Text>
          )
        })}
        <Text
          style={styles.stat}>
          {`End: ${this.state.end}`}
        </Text>
        <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
          <Text>Record</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing.bind(this)}>
          <Text
            style={styles.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing.bind(this)}>
          <Text
            style={styles.action}>
            Cancel
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer.bind(this)}>
          <Text
            style={styles.action}>
            Destroy
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default VoiceTest
