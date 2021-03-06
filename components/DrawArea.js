import React, { Component } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  PanResponder,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import UUID from 'react-native-uuid';
import { Header } from 'react-navigation';

let columns = 7;
let rows = 15;

let items = [];

let h = (Dimensions.get('window').height - StatusBar.currentHeight - Header.HEIGHT) / rows;
let w = Dimensions.get('window').width / columns;

class DrawArea extends Component {
  constructor(props) {
    super(props);
    
    this._panResponder = this.setUpPanResponder();
    this.navigate = this.props.navigation;
  }

  state = {
    index: 0,
    activeItemCount: 0,
    firstTouchSelected: false,
    dataSource: {},
    selected: (new Map())
  };  

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('Address', '...'),
    headerRight: (
      <View 
        style={{
            margin: 10,
            padding: 10
        }}>
        <Button
          onPress={() => {
            if(navigation.getParam('hasActiveItem')) {
              DrawArea._saveArea(navigation);
            }
          }}
          title="Learn More"
          color={navigation.getParam('hasActiveItem') ? '#000' : '#ddd'}
        />
      </View>
    )
  })

  static _saveArea(navigation) {
    // console.log(navigation.getParam('data'), navigation);
    const data = {
      data: navigation.getParam('data'),
      Address: navigation.getParam('Address'),
      AreaCode: navigation.getParam('AreaCode')
    }
    console.log(data, UUID.v1());
    try {
      AsyncStorage.setItem(UUID.v1(), JSON.stringify(data));
      navigation.navigate('Areas');
    } catch(e) {
      console.log(e);
    }
  }

  getColumn(x, y, press) {
    press = press || false;

    let x_ = parseInt(x / w) + 1;
    let y_ = parseInt(y / h);
    
    let index = ((x_+1) + (y_*7)) -9;
    index = index > 0 ? index : 0; 

    if(this.state.index == index && !press) {
      return;
    }

    this.state.index = index;
    let currentCell = this.state.dataSource[index];
    
    if(currentCell) {
      if(!press) {
        currentCell.selected = this.state.firstTouchSelected;
        this.setState({
          activeItemCount: currentCell.selected ? ++this.state.activeItemCount : --this.state.activeItemCount
        });
      } else {
        currentCell.selected = !currentCell.selected;
        this.setState({
          firstTouchSelected: currentCell.selected,
          activeItemCount: currentCell.selected ? ++this.state.activeItemCount : --this.state.activeItemCount
        })
      }

      this.props.navigation.setParams({
        data: this.state.dataSource
      });

    }

    this.setState({
      dataSource: this.state.dataSource
    });

    this.props.navigation.setParams({ 
      hasActiveItem: !!this.state.activeItemCount
    });       
  }

  setUpPanResponder() {
    return PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.getColumn(Math.floor(evt.nativeEvent.pageX), Math.floor(evt.nativeEvent.pageY), true);
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        // console.log('onPanResponderGrant');
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        // console.log('onPanResponderMove', evt.nativeEvent.target, 'target');
        // console.log(w, h);
        this.getColumn(Math.floor(evt.nativeEvent.pageX), Math.floor(evt.nativeEvent.pageY));
        // this.props.emitter.emit('touchMove');
        // console.log('px', evt.nativeEvent);
        // console.log('py', evt.nativeEvent.pageY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // console.log('onPanResponderRelease');
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        // console.log('onShouldBlockNativeResponder');
        return true;
      },
    });
  }

  componentDidMount() {
    var that = this;
    
    this.props.navigation.setParams({ 
      hasActiveItem: false
    });

    items = Array.apply(null, Array(columns * rows)).map((v, i) => {
      return { 
        id: i,
        selected: false
      };
    });

    that.setState({
      dataSource: items,
    });
  }

  _renderItem = ({item}) => {
    return (
      <ColumnItem
        id={item.id}
        selected={this.state.dataSource[item.id].selected}
      />
    );
  }

  render() {
    return (
        <View {...this._panResponder.panHandlers} style={styles.MainContainer}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this._renderItem}
            numColumns={columns}
            keyExtractor={(item, index) => index}
            extraData={this.state}
          />
        </View>
    );
  }
} 

class ColumnItem extends React.PureComponent {
  render() {
    const bgColor = this.props.selected ? '#1a1a1a' : '#ccc';
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: h,
            backgroundColor: bgColor,
            borderWidth: 1,
            borderColor: '#1a1a1a',
            width: Dimensions.get('window').width / columns
          }}>
          <Text>{ this.props.id.toString()}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1
  },
  column: {
    
  },
  SubmitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    marginTop: 15,
    height: 40,
   },
   SubmitButtonText: {
    color: 'white'
   }
});

export default DrawArea;