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
import { RNS3 } from 'react-native-aws3';
import Spinner from 'react-native-spinkit'
import AWS from 'aws-sdk/dist/aws-sdk-react-native'

AWS.config.update({
  accessKeyId: 'AKIAJBXWNUBWGAIFT2FA',
  secretAccessKey: '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',
  region: 'us-east-1'
})

var s3 = new AWS.S3();

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

  cancelImage() {
    this.setState({ path: null, isUploading: false, isProcessing: false })
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

  takePicture() {
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
    console.log(imageName);

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: this.state.path,
      name: imageName,
      type: "image/jpg"
    }

    console.log('image sudah tertangkap');

    const options = {
      keyPrefix: "uploads/",
      bucket: "lisica-interactive-education-app",
      region: "us-east-1",
      accessKey: "AKIAJBXWNUBWGAIFT2FA",
      secretKey: "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",
      successActionStatus: 201
    }

    console.log('bucket');

    RNS3.put(file, options).then(response => {
      console.log('hayy');
      if (response.status !== 201) {
        throw new Error("Failed to upload image to S3");
        this.setState({ isUploading: false })
      }
      console.log(response.body);
      this.setState({ isUploading: false })

      this.setState({ isProcessing: true })
      console.log('siap-siap rekog');

      let rekognition = new AWS.Rekognition();

      var params = {
        Image: {
         S3Object: {
          Bucket: "lisica-interactive-education-app",
          Name: `uploads/${imageName}`
         }
        }
      }

      console.log('saatnya rekog');

      rekognition.detectLabels(params, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
      });

      this.setState({ isProcessing: false })
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    })
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
