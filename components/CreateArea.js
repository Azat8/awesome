import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default class CrateArea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Address: '',
			AreaCode: ''
		};
	}

	static navigationOptions = {
		title: 'Create Area'
	}

	_handleAddressChange = (value) => {
		console.log(value);
	}

	_handeleAreaCodeChange = (value) => {
		console.log(value);
	}

	_submitForm() {

	}

	render() {
		return(
			<View style={styles.Form}>
				<TextInput
					style={styles.Input} 
					placeholder={'Address'}
					onChangeText={this._handleAddressChange}
				/>
				<TextInput
					style={styles.Input} 
					placeholder={'Area Code'}
					onChangeText={this._handleAreaCodeChange}
				/>
				<TouchableOpacity
          style = {styles.SubmitButton}
          onPress = {this._submitForm}>
           <Text style = {styles.SubmitButtonText}> Submit </Text>
        </TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Form: {
		justifyContent: 'center',
		flex:1,
		margin: 20
	},
	Input: {
		borderBottomWidth: 2,
		borderBottomColor: '#ddd'
	},
	SubmitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   SubmitButtonText:{
      color: 'white'
   }
})