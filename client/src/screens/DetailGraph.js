import React, { Component } from 'react'
import { StyleSheet, ART, ScrollView, Button, Text } from 'react-native'
import { Bar } from 'react-native-pathjs-charts'
import { ArtyChartyPie } from 'arty-charty';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

let kidsProgress = [
  { success: true, repeat: 0, word: 'water bottle' },
  { success: false, repeat: 0, word: 'bottle' },
  { success: true, repeat: 5, word: 'toy' },
  { success: true, repeat: 0, word: 'electronics' },
  { success: false, repeat: 3, word: 'keyboard' },
  { success: true, repeat: 2, word: 'table' },
  { success: false, repeat: 1, word: 'jug' },
  { success: true, repeat: 0, word: 'handphone' },
  { success: true, repeat: 3, word: 'key' },
  { success: false, repeat: 2, word: 'paper' },
  { success: true, repeat: 1, word: 'book' },
  { success: true, repeat: 4, word: 'glasses' },
  { success: false, repeat: 1, word: 'cup' },
  { success: true, repeat: 0, word: 'guitar' },
  { success: false, repeat: 5, word: 'piano' },
  { success: true, repeat: 2, word: 'coffee table' }
]

kidsProgress.forEach(k => {
  Object.defineProperty(k, 'name', Object.getOwnPropertyDescriptor(k, 'word'))
  delete k['word']
})

let kidsSuccess = kidsProgress.filter(p => {
  return p.success ? true : false
})

let kidsFail = kidsProgress.filter(p => {
  return p.success ? false : true
})

// Take only the last few elements
kidsSuccess = kidsSuccess.slice(Math.max(kidsSuccess.length - 10, 0))
kidsFail = kidsFail.slice(Math.max(kidsFail.length - 10, 0))

class DetailGraph extends Component {
  static navigationOptions = {
    title: 'Detail Graph',
    header: null
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Machine Learning' },
      { key: '2', title: 'Kid\'s Progress ' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  render() {
    let successData = [
      kidsSuccess
    ]

    let failData = [
      kidsFail
    ]

    let successChartOptions = {
      width: kidsSuccess <= 5 ? 250 : 250 + (50 * (kidsSuccess.length - 5)),
      height: 200,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    let failChartOptions = {
      width: kidsFail <= 5 ? 250 : 250 + (50 * (kidsSuccess.length - 5)),
      height: 200,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    const FirstRoute = () => {
      return (
        <ScrollView style={[ styles.container, { backgroundColor: '#F9F8F8' } ]}>
          <ArtyChartyPie
            data={{
            data: [
              {value: .6, color: 'red'},
              {value: 5, color: 'green'},
              {value: 3, color: 'blue'}]
          }}/>
        </ScrollView>
      )
    }
    const SecondRoute = () => {
      return (
        <ScrollView style={[ styles.container, { backgroundColor: '#F9F8F8' } ]}>
          <ScrollView horizontal={true}>
            <Text>Success (Lower, Better)</Text>
            <Bar data={successData} options={successChartOptions} accessorKey='repeat'/>
          </ScrollView>
          <ScrollView horizontal={true}>
            <Text>Fail (Higher, Better)</Text>
            <Bar data={failData} options={failChartOptions} accessorKey='repeat'/>
          </ScrollView>
        </ScrollView>
      )
    }

    _renderScene = SceneMap({
      '1': FirstRoute,
      '2': SecondRoute,
    });

    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={_renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailGraph
