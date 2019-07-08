import React, { Component } from 'react';
import { 
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';

import GlobalVars from '../GlobalVars';

class RenderHouse extends React.PureComponent {
	constructor(props) {
    super(props);
	}

	render() {
		return (
			<View style={styles.FlatItem}>
				<Text style={styles.ItemText}>{ this.props.item.index }</Text>
			</View>
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
    this._generateHouses(
      navProps.numberOfFloors, 
      navProps.numberOfHouses, 
      navProps.startHouseNumber
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
    return (
      <View style={styles.FlatListContainer}>
        <FlatList
					data={this.state.houses}
					renderItem={this._renderItem}
          keyExtractor={(item) => item.homeNumber.toString()}
          numColumns={this.state.numberOfHouses}
          key={this.state.numberOfHouses}
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FlatListContainer: {
    flex: 1,
    marginVertical: 20, 
  },
  FlatItem: {
    backgroundColor: '#6495ED',
    flex: 1, 
    margin: 1
  },
  ItemText: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  }
});