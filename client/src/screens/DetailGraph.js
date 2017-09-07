import React, { Component } from 'react'
import { StyleSheet, ART, View, Button, Text } from 'react-native'
const {
  Surface,
  Group,
  Shape,
} = ART;



class DetailGraph extends Component {
  static navigationOptions = {
    title: 'Detail Graph',
    header: null
  }

  ReactNativeART() {
    return (
      <View>
        <Surface width={500} height={500}>
          <Group x={100} y={0}>
            <Shape
              d="M10 10 C 40 10, 65 10, 95 80 S 150 150, 180 80"
              stroke="#2ecc71"
              strokeWidth = {12}
              strokeDash = {[10, 20]}
              strokeCap="butt"
              strokeJoin="bevel"
            />
          </Group>
        </Surface>
      </View>
    )
  }

  render () {
    return (
      <View>
        <Text>hay</Text>
        { this.ReactNativeART() }
      </View>
    )
  }
}

export default DetailGraph
