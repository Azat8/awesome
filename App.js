import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

import DrawArea from './components/DrawArea';
import Areas from './components/Areas';

const AppNavigator = createStackNavigator(
  {
    Areas: Areas,
    DrawArea: DrawArea
  },
  {
    initalRouteName: Areas
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}