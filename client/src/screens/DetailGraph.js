import React, { Component } from 'react'
import { StyleSheet, ART, ScrollView, Button, Text, View } from 'react-native'
import { Bar } from 'react-native-pathjs-charts'
import { ArtyChartyPie } from 'arty-charty';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation'

import { ButtonSmall } from '../components/common';
 
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
    title: 'Kid\'s Data',
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

  _renderHeader = props => <TabBar {...props} style={styles.tabbar} indicatorStyle={styles.indicator} />;

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
      color: '#66C3FF',
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
          
          fontSize: 12,
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
      color: '#CD533B',
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
          
          fontSize: 12,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    const FirstRoute = () => {
      return (
        <ScrollView style={[ styles.container, { backgroundColor: '#FEFDFF' } ]}>
          <ArtyChartyPie
            data={{
            data: [
              {value: .6, color: '#EB9486'},
              {value: 5, color: '#93E5AB'},
              {value: 3, color: '#66C3FF'}
              ]
            }}/>
        </ScrollView>
      )
    }
    const SecondRoute = () => {
      return (
        <ScrollView style={[ styles.container, { backgroundColor: '#FEFDFF' } ]}>
          {/* FAIL RATE */}
          <View 
            style={{
              marginTop: 10
            }}
          >
            <Text
            style={{
                fontSize: 32,
                fontWeight: '700',
                left: 20,
                letterSpacing: 2,
                color: '#272838'
              }}
            >
              ATTEMPTS
            </Text>
          </View>

          <View 
            style={{
              marginTop: 10,
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
          <Text
          style={{
              fontSize: 20,
              letterSpacing: 2,
              color: '#66C3FF'
            }}
          >
            Success Rate
          </Text>
          </View>
          <ScrollView horizontal={true}>
            
            <Bar data={successData} options={successChartOptions} accessorKey='repeat'/>
          </ScrollView>

          {/* FAIL RATE */}

          <View 
          style={{
            marginTop: 10
          }}
          >
          <Text
          style={{
              fontSize: 32,
              fontWeight: '700',
              left: 20,
              letterSpacing: 2,
              color: '#272838'
            }}
          >
            ATTEMPTS
          </Text>
          </View>

          <View 
            style={{
              marginTop: 10,
              paddingLeft: 20,
              paddingRight: 20
            }}
          >
          <Text
          style={{
            fontSize: 20,
            letterSpacing: 2,
            color: '#CD533B'
            }}
          >
            Incorrect Rate
          </Text>
          </View>
          <ScrollView horizontal={true}>
            
            <Bar data={failData} options={failChartOptions} accessorKey='repeat'/>
          </ScrollView>
        </ScrollView>
      )
    }

    _renderScene = SceneMap({
      '1': FirstRoute,
      '2': SecondRoute,
    });

    const backAction = NavigationActions.back({
      key: null
    })

    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <ButtonSmall
            onPress={ () => this.props.navigation.dispatch(backAction) }
          >
            <Text>PARENT</Text>
          </ButtonSmall>
          <Text
            style={{
              fontSize: 24,
              color: 'white',
              fontWeight: 'bold',
              left: 50,
              letterSpacing: 2
            }}
          >
            KID'S DATA
          </Text>
        </View>
        <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={_renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabbar: {
    backgroundColor: '#7E7F9A',
  },
  indicator: {
    backgroundColor: '#EB9486',
  },
  headerStyle: {
		backgroundColor: '#7E7F9A',
    height: 80,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		elevation: 2,
    position: 'relative',
    flexDirection: 'row'
	},
});

export default DetailGraph
