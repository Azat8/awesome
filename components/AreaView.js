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
import HeaderNavigation from './HeaderNavigation';
import Areas from './Areas';

let columns = 7;
let rows = 15;

let items = [];

let h = (Dimensions.get('window').height - StatusBar.currentHeight - Header.HEIGHT) / rows;
let w = Dimensions.get('window').width / columns;

class AreaView extends Component {
  constructor(props) {
    super(props);
  
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
              AreaView._saveArea(navigation);
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

  componentDidMount() {
    const items = this.props.navigation.getParam('data');
    console.log(items, 'items');  
    this.setState({
      dataSource: items,
    });
  }

  getHome() {
    return this.props.navigation;
  }

  _renderItem = ({item}) => {
    return (
      <ColumnItem
        id={item.id}
        selected={this.state.dataSource[item.id].selected}
        navigate={this.navigate}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this._renderItem}
        numColumns={columns}
        keyExtractor={(item, index) => index}
        extraData={this.state}
      />
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

class ColumnItem extends React.PureComponent {
  render() {
    const bgColor = this.props.selected ? '#1a1a1a' : '#ccc';
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigate.navigate('HomeView', this.props);
        }}
      >
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
      </TouchableHighlight>
    );
  }
}

export default AreaView;