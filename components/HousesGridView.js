import React, { Component } from 'react';
import { 
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Alert,
  StatusBar,
  Header
} from 'react-native';

import GlobalVars from '../GlobalVars';

class RenderHouse extends React.PureComponent {
	constructor(props) {
    super(props);
  }
  
  state = {
    visible: false
  }

  toggleModal(visible) {
    this.setState({
      visible: visible
    });
  }  

	render() {
    console.log(this.props);
    let squareSize = GlobalVars.width / this.props.item.item.numHouses;
		return (
      <TouchableHighlight
        onPress={() => {
          this.toggleModal(true);
        }}
      >
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            backgroundColor: '#ddd',
            borderWidth: 1,
            borderColor: '#1a1a1a',
            width: squareSize
          }}>
          <Text>{ this.props.item.index }</Text>
        </View>
      </TouchableHighlight>
    
		);
	}
}

export default class HousesGridView extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    numFloors: 0,
    numHouses: 0,
    startNumber: 0,
    houses: []
  }

  componentDidMount() {
    let navProps = this.props.navigation.state.params;
    // this._generateHouses(
    //   navProps.numberOfFloors, 
    //   navProps.numberOfHouses, 
    //   navProps.startHouseNumber
    // );


    this._generateHouses(
      10, 
      4, 
      1
    );
  }

  _generateHouses = (numFloors, numHouses, startNumber) => {
		const houses = Array.apply(null, Array(numFloors * numHouses)).map((v, i) => {
      return {
        homeNumber: i,
        numHouses: numHouses
			};
    });

		this.setState({
			numFloors: numFloors,
			numHouses: numHouses,
			startNumber: startNumber,
			hasFloor: true,
			houses: houses
		});
	}

  _renderItem(item) {
		return <RenderHouse item={item} />;
	}

  render() {
    if(this.state.numHouses) {
      return (
        <View style={styles.FlatListContainer}>
          <FlatList
            data={this.state.houses}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.homeNumber.toString()}
            numColumns={this.state.numHouses}
            // key={this.state.numberOfHouses}
          />
        </View>
      );
    }

    return null;

  }
}

const styles = StyleSheet.create({
  FlatListContainer: {
    // justifyContent: 'center',
    // flexDirection: 'row',
    flex: 1 ,
    // marginVertical: 20
  },
  FlatItem: {
    backgroundColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
    margin: 1
  },
  ItemText: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 100,
  }

});
