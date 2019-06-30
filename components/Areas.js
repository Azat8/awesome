import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const fetchAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);

    return items;
  } catch (error) {
    console.log(error, "problemo");
  }
}

export default class Areas extends Component {	
  constructor(props) {
    super(props);
 
    this.state = { 
    	FlatListItems: []
    }
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

  componentDidMount() {
  	let areas = [];
		fetchAllItems().then((items) => {
			items.forEach((v, i) => {
				areas.push({
					id: v[0],
					data: JSON.parse(v[1])
				});
			}); 
		});

		console.log(areas, 'areas');
		this.setState({
			FlatListItems: areas
		});
  }

  render() {
  	const { navigate } = this.props.navigation;
    return (
			<View style={styles.MainContainer}>
		   <FlatList
		      data={ this.state.FlatListItems }
		      ItemSeparatorComponent = {this.FlatListItemSeparator}
		      renderItem={({item}) => 
		      	<Text 
		      		style={styles.item} 
		      		onPress={() => {
		      			navigate('AreaView', {
			      			Address: item.data.Address,
			      			data: item.data.data
		      			})
		      		}}> 
		      			{item.data.Address} 
	      		</Text>
	      	}
		      keyExtractor={(item) => item.id}
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
