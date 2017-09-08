import React, { Component } from 'react'
import { StyleSheet, ART, View, Button, Text } from 'react-native'
import { Pie } from 'react-native-pathjs-charts'

class DetailGraph extends Component {
  static navigationOptions = {
    title: 'Detail Graph',
    header: null
  }

  render() {
    let data = [{
      "name": "Anak anda Bodoh",
      "population": 7694980
    }, {
      "name": "Anak anda Cupu",
      "population": 2584160
    }, {
      "name": "Anak anda Galer",
      "population": 6590667
    }, {
      "name": "Anak anda Pintar",
      "population": 7284698
    }]

    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 10
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View>
        <Pie
          data={data}
          options={options}
          accessorKey="population" />
      </View>
    )
  }




}

export default DetailGraph
