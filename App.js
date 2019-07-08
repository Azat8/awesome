import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

import DrawArea from './components/DrawArea';
import Areas from './components/Areas';
import CreateArea from './components/CreateArea';
import AreaView from './components/AreaView';
import HomeView from './components/HomeView';
import HousesGridView from './components/HousesGridView';

const AppNavigator = createStackNavigator(
  {
    Areas: Areas,
    DrawArea: DrawArea,
    CreateArea: CreateArea,
    AreaView: AreaView,
    HomeView: HomeView,
    HousesGridView: HousesGridView
  },
  {
    initalRouteName: Areas
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}