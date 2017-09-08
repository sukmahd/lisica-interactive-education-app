import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';

import Camera from 'react-native-camera';

class CameraComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      path: null,
      isUploading: false,
      isProcessing: false
    }
  }

  static navigationOptions = {
    title: 'Camera Take',
    header: null
  }

  renderCamera () {
    return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
        >
        <TouchableHighlight
          style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 5, borderColor: '#FFF', marginBottom: 15 }}
          onPress={ this.takePicture.bind(this) }
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View></View>
        </TouchableHighlight>

      </Camera>
    )
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path })


      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})

export default CameraComponent
