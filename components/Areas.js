import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Areas extends Component {	
  constructor(props) {
    super(props);
 
    this.state = { FlatListItems: [
      {key: 'One'},
      {key: 'Two'},
      {key: 'Three'},
      {key: 'Four'},
      {key: 'Five'},
      {key: 'Six'},
      {key: 'Seven'},
      {key: 'Eight'},
      {key: 'Nine'},
      {key: 'Ten'},
      {key: 'Eleven'},
      {key: 'Twelve'}
    ]}
	}

	static navigationOptions = {
		title: 'Areas'
	}
 
	FlatListItemSeparator = () => {
	  return (
	    <View
	      style={{
	        height: 1,
	        width: "100%",
	        backgroundColor: "#607D8B",
	      }}
	    />
	  );
  }
 
  GetItem (item) { 
  	Alert.alert(item);
  }

  render() {
  	const { navigate } = this.props.navigation;
    return (
			<View style={styles.MainContainer}>
		   <FlatList
		      data={ this.state.FlatListItems }
		      ItemSeparatorComponent = {this.FlatListItemSeparator}
		      renderItem={({item}) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.key)} > {item.key} </Text>}
		    />
		    <Icon
		    	style={styles.IconAdd}
	        onPress={() => navigate('CreateArea')}
	        name="ios-add"
	        color="black"
	        size={60}
	      />
			</View>  
    );
  }
}
 
const styles = StyleSheet.create({
	MainContainer: {
		// Setting up View inside content in Vertically center.
		justifyContent: 'center',
		flex:1,
		margin: 10
	},
	item: {
	  padding: 10,
	  fontSize: 18,
	  height: 44,
	},
	IconAdd: {  
		borderRadius: 100,
		paddingRight: 15,            
		paddingLeft: 15,            
		backgroundColor: '#ddd',                                 
		position: 'absolute',                                          
		bottom: 10,                                                    
		right: 10, 
		textAlign: 'center'
	}
});
