import Tts from 'react-native-tts';

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'



class Ngorte extends Component {
  
  ngomong(word){
    // for(i = 0; i < word.length; i++) {
    //   Tts.speak(word[i]);
    // }
    
    Tts.speak(word);
  }
  
	render() {
		return(
      <View>
      <Button onPress={() => this.ngomong('keyboard')} title="Ngorte" />
      </View>
		)
	}
}

export default Ngorte;