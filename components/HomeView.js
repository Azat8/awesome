import React, { Component } from 'react'; 
import { 
    View,
		Text,
		TextInput, 
		StyleSheet, 
		TouchableOpacity,
		FlatList,
		Button
} from 'react-native';

export default class HomeView extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		valid: false,
		numberOfFloors: 0,
		numberOfHouses: 0,
		startHouseNumber: 0,
		startNumber: 0
	}

	_handleInputChange(text, prop) {
		let state = {};
		state[prop] = text ? +text : 0;	
		this.setState(state);	
	}

	render() {
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.Form}>
				<Text>
					floors: { this.state.numberOfFloors }, houses: { this.state.numberOfHouses }, valid: { this.state.valid }
				</Text>
				<TextInput
					style={styles.Input} 
					placeholder={'Number of floors '}
					keyboardType={'numeric'}
					onChangeText={(text) => this._handleInputChange(text, 'numberOfFloors')}
				/>
				<TextInput
					style={styles.Input} 
					placeholder={'Number of houses'}
					keyboardType={'numeric'}
					onChangeText={(text) => this._handleInputChange(text, 'numberOfHouses')}
				/>
				<TextInput
					style={styles.Input} 
					placeholder={'Start house number'}
					keyboardType={'numeric'}
					onChangeText={(text) => this._handleInputChange(text, 'startHouseNumber')}
				/>
				<TouchableOpacity
					disabled={!(this.state.numberOfFloors && this.state.numberOfHouses)}	
          style={styles.SubmitButton}
          onPress={() => navigate('HousesGridView', this.state)}
          style={{
						backgroundColor: (
							this.state.numberOfFloors && 
							this.state.numberOfHouses
						) ? '#000' : '#ddd',
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
});