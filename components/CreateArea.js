import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default class CrateArea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Address: '',
			AreaCode: '',
			Valid: false
		};
	}

	static navigationOptions = {
		title: 'Create Area'
	}

	_handleAddressChange = (value) => {
		this.setState({
			Address: value,
			Valid: !!value && this.state.AreaCode
		})
	}

	_handleAreaCodeChange = (value) => {
		this.setState({
			AreaCode: value,
			Valid: !!value && !!this.state.Address
		})
	}

	render() {
		const { navigate } = this.props.navigation;
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
					disabled={!this.state.Valid}	
          style={styles.SubmitButton}
          onPress={() => navigate('DrawArea', this.state)}
          style={{
					    backgroundColor: this.state.Valid ? '#000' : '#ddd',
					    padding: 10,
					    marginTop: 15,
					    height: 40,
					   }}>
           <Text style={styles.SubmitButtonText}>Next</Text>
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
    marginTop: 15,
    height: 40,
   },
   SubmitButtonText:{
    color: 'white'
   }
})