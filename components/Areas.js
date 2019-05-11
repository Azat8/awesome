import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

export default class Areas extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{
					name: 'Test'
				}
			]
		}
	}	

	static navigationOptions = {
		title: 'Areas'
	}

	_onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  _keyExtractor = (item, index) => item.name;

  render() {
  	console.log(this.state.data);
    return (
      <FlatList
        data={this.state.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    );
  }
}