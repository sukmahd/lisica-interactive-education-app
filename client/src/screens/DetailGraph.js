import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, ART, ScrollView, Button, Text, View } from 'react-native'
import { Bar } from 'react-native-pathjs-charts'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation'
import Spinner from 'react-native-spinkit'

import { ButtonSmall } from '../components/common';
import { get_record } from '../actions'

let kidsProgressDummy = [
  { success: true, repeat: 0, word: 'water bottle', answer: 'water bottle' },
  { success: false, repeat: 0, word: 'bottle', answer: 'headset' },
  { success: true, repeat: 5, word: 'toy', answer: 'toy' },
  { success: false, repeat: 3, word: 'electronics', answer: 'laptop' }
]

kidsProgressDummy.forEach(k => {
  Object.defineProperty(k, 'name', Object.getOwnPropertyDescriptor(k, 'word'))
  delete k['word']
})

let kidsSuccessDummy = kidsProgressDummy.filter(p => {
  return p.success ? true : false
})

let kidsFailDummy = kidsProgressDummy.filter(p => {
  return p.success ? false : true
})

// Take only the last few elements
kidsSuccessDummy = kidsSuccessDummy.slice(Math.max(kidsSuccessDummy.length - 10, 0))
kidsFailDummy = kidsFailDummy.slice(Math.max(kidsFailDummy.length - 10, 0))

class DetailGraph extends Component {
  static navigationOptions = {
    title: 'Kid\'s Data',
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {
      kidsSuccess: kidsSuccessDummy,
      kidsFail: kidsFailDummy,
      isLoading: false,
      index: 0,
      routes: [
        { key: '1', title: 'CORRECT' },
        { key: '2', title: 'INCORRECT' },
      ],
    };
  }

  kidsProgressFunc (kidsProgress) {
    kidsProgress.forEach(k => {
      Object.defineProperty(k, 'name', Object.getOwnPropertyDescriptor(k, 'word'))
      delete k['word']
    })
    console.log('hehehe', kidsProgress)
    this.kidsSuccessAndFailFunc(kidsProgress)
  }

  kidsSuccessAndFailFunc (kidsProgress) {
    let kidsSuccess = kidsProgress.filter(p => {
      return p.success ? true : false
    })
    let kidsFail = kidsProgress.filter(p => {
      return p.success ? false : true
    })

    kidsSuccess = kidsSuccess.slice(Math.max(kidsSuccess.length - 10, 0))
    kidsFail = kidsFail.slice(Math.max(kidsFail.length - 10, 0))

    this.setState({ kidsSuccess, kidsFail, isLoading: false })
  }

  componentWillMount () {
    this.setState({ isLoading: true })
    this.props.getRecord(this.props.email)
  }

  componentWillReceiveProps (nextProps){
    console.log('------------------------dapet props', nextProps);
    this.kidsProgressFunc(nextProps.records)
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={styles.tabbar} indicatorStyle={styles.indicator} />;

  render() {
    let kidsSuccess = this.state.kidsSuccess
    let kidsFail = this.state.kidsFail

    let successData = [
      kidsSuccess
    ]

    let failData = [
      kidsFail
    ]

    let successChartOptions = {
      width: kidsSuccess.length <= 5 ? 250 : 250 + (50 * (kidsSuccess.length - 5)),
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
      width: kidsFail.length <= 5 ? 250 : 250 + (50 * (kidsFail.length - 5)),
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
            {/* SUCCESS RATE */}
          { this.state.isLoading ?
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 130, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                type="ThreeBounce"
                isVisible={ true }
                size={ 150 }
                color="#5887FF"
              />
            </View>
            :
            <View>
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
                    color: '#66C3FF'
                  }}
                >
                  Correct
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
                    color: '#272838'
                  }}
                >
                  Attempts Rate (Lower, Better)
                </Text>
                <Text
                style={{
                    fontSize: 15,
                    letterSpacing: 2,
                    color: '#34495e'
                  }}
                >
                  Success with fewer attempts, indicates faster learning curve
                </Text>
              </View>
              <ScrollView horizontal={true}>
                <Bar data={successData} options={successChartOptions} accessorKey='repeat'/>
              </ScrollView>
            </View>
          }
        </ScrollView>
      )
    }
    const SecondRoute = () => {
      return (
        <ScrollView style={[ styles.container, { backgroundColor: '#FEFDFF' } ]}>
        {/* FAIL RATE */}
          { this.state.isLoading ?
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 130, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                type="ThreeBounce"
                isVisible={ true }
                size={ 150 }
                color="#5887FF"
              />
            </View>
            :
            <View>
              <View
                style={{ marginTop: 10 }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: '700',
                    left: 20,
                    letterSpacing: 2,
                    color: '#CD533B'
                  }}
                >
                  Incorrect
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
                    color: '#272838'
                  }}
                >
                  Attempts Rate (Higher, Better)
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    letterSpacing: 2,
                    color: '#34495e'
                  }}
                >
                  More attempts, indicates unwillingness to give-up
                </Text>
              </View>
              <ScrollView horizontal={true}>
                <Bar data={failData} options={failChartOptions} accessorKey='repeat'/>
              </ScrollView>
            </View>
          }
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
            KIDS DATA
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

const mapStateToProps = (state) => {
  console.log('---------------------------mapStateToProps:', state  );
  return {
  records: state.wordStore.records,
  email: state.wordStore.email
}}

const mapDispatchToProps = (dispatch) => ({
  getRecord: (email) => dispatch(get_record(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailGraph)
