import React, { Component} from 'react'
import { View, Text, Button } from 'react-native';

var Speech = require('react-native-speech');

class TextToVoice extends Component{
  
  _startHandler() {
    Speech.speak({
      text: 'React Native Speech is awesome! ',
      voice: 'en-US'
    })
    .then(started => {
      console.log('Speech started');
    })
    .catch(error => {
      console.log('You\'ve already started a speech instance.');
    });
  }

  _pauseHandler() {
    Speech.pause();
  }

  _resumeHandler() {
    Speech.resume();
  }

  _stopHandler() {
    Speech.stop();
  }

  render() {
    return (
      <View>
        <Button title="Speak" onPress={this._startHandler}/>
        <Button title="Pause" onPress={() => this._pauseHandler}/>
        <Button title="Resume" onPress={() =>this._resumeHandler}/>
        <Button title="Stop" onPress={() =>this._stopHandler}/>
      </View>
    );
  }
};

export default TextToVoice