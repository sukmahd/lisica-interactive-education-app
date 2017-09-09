import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv'

import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';
import Spinner from 'react-native-spinkit'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

import { ButtonSmall, ButtonBig } from '../components/common'

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

const uploadOptions = {
  keyPrefix: "uploads/",
  bucket: "lisica-interactive-education-app",
  region: "us-east-1",
  accessKey: ACCESS_KEY_ID,
  secretKey: SECRET_ACCESS_KEY,
  successActionStatus: 201
}

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

  cancelImage () {
    this.setState({ path: null, isUploading: false, isProcessing: false })
  }

  takePicture () {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  uploadImageToS3 () {
    this.setState({ isUploading: true })
    console.log(this.state.path);
    let imageName = this.state.path.split("Pictures/")[1]

    const file = {
      uri: this.state.path,
      name: imageName,
      type: "image/jpg"
    }

    RNS3.put(file, uploadOptions)
    .then(response => {
      if (response.status !== 201) {
        throw new Error("Failed to upload image to S3");
        this.setState({ isUploading: false })
      }

      console.log(response.body);
      this.imageRekognition(imageName)
    })
    .catch(err => console.log(err))
  }

  imageRekognition (imageName) {
    const { navigate } = this.props.navigation
    let rekognition = new AWS.Rekognition();
    this.setState({ isProcessing: true, isUploading: false })

    var params = {
      Image: {
       S3Object: {
        Bucket: "lisica-interactive-education-app",
        Name: `uploads/${imageName}`
       }
      }
    }

    let self = this
    rekognition.detectLabels(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data.Labels[0]);
        self.setState({ isProcessing: false })
        navigate('ListObjectsScreen', { labels: data.Labels })
      }
    })
  }

  renderImage () {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}
        >
          { this.state.isUploading ?
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', backgroundColor: 'transparent' }}>
              <Text style={{ fontWeight: 'normal', fontSize: 15, backgroundColor: 'transparent', color: '#FFF', marginBottom: 20 }}>Uploading..</Text>
              <Spinner
                type="9CubeGrid"
                isVisible={ true }
                size={ 100 }
                color="#FFF"
              />
            </View>
            : <Text></Text>
          }
          { this.state.isProcessing ?
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', backgroundColor: 'transparent' }}>
              <Text style={{ fontWeight: 'normal', fontSize: 15, backgroundColor: 'transparent', color: '#FFF', marginBottom: 20 }}>Processing Image..</Text>
              <Spinner
                type="ChasingDots"
                isVisible={ true }
                size={ 100 }
                color="#FFF"
              />
            </View>
            : <Text></Text>
          }
          <Text onPress={ () => this.cancelImage() } style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'transparent' ,color: '#FFF', fontWeight: '600', fontSize: 20 }}>Cancel</Text>
          <Text onPress={ () => this.uploadImageToS3() } style={{ position: 'absolute', bottom: 20, backgroundColor: 'transparent' ,color: '#FFF', fontWeight: '600', fontSize: 20 }}>haha</Text>
        </Image>
      </View>
    )
  }

  renderCamera () {
    const { navigate } = this.props.navigation;

    return (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
        >

        <View style={{
          height: null,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: 20
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingLeft: 50
          }}>
          <ButtonSmall
						backgroundColor='#ff85a5'
						fontSize={14}
						width={80}
						onPress={() => navigate('MainMenuScreen')}
					>
						<Text>MAIN</Text>
					</ButtonSmall>
          </View>
				</View>

        <TouchableHighlight
          style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 10, borderColor: '#f4f9fc', marginBottom: 20, backgroundColor: '#d0e9ea', justifyContent: 'center', alignItems: 'center' }}
          onPress={ this.takePicture.bind(this) }
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <Text>📸</Text>
        </TouchableHighlight>

      </Camera>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
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
