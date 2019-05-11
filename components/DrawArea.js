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
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-navigation';
import HeaderNavigation from './HeaderNavigation';
import Areas from './Areas';

let columns = 7;
let rows = 15;

let items = [];

let h = (Dimensions.get('window').height - StatusBar.currentHeight - Header.HEIGHT) / rows;
let w = Dimensions.get('window').width / columns;

class DrawArea extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      index: 0,
      firstTouchSelected: false,
      dataSource: {},
      selected: (new Map())
    };
    
    this._panResponder = this.setUpPanResponder();
    this.navigate = this.props.navigation;
    console.log(this.navigate);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Bagratunyants st...',
    headerLeft: (
      <Icon
        onPress={() => navigation.navigate('Areas')}
        name="ios-arrow-back"
        color="black"
        size={30}
        style={{ paddingLeft: 20 }}
      />
    ),
    headerRight: (
      <View style={{ paddingRight: 20 }}>
        <Button
          size={30}
          title="Save area"
          color="#000"
          accessibilityLabel="Save area"
          onPress={() => alert('Save area!')}
        />
      </View>
    ),
  })

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
      } else {
        currentCell.selected = !currentCell.selected;
        this.setState({
          firstTouchSelected: currentCell.selected
        })
      }
    }

    this.setState({
      dataSource: this.state.dataSource
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
 
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1
  },
  column: {
    
  },
});

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
          }}
        >
          <Text>{ this.props.id.toString()}</Text>
        </View>

      </TouchableWithoutFeedback>
    );
  }
}

export default DrawArea;