/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React from 'react';
import { Icon} from 'native-base';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FavoriteScreen from './src/screens/FavoriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ForYouScreen from './src/screens/ForYouScreen';
import LoginScreen from './src/screens/LoginScreen';



const MainNavigator = createAppContainer(createBottomTabNavigator({
  ForYou: {
    screen: ForYouScreen,
    navigationOptions:{
          title: 'For You',
          tabBarIcon: ({ tintColor }) => (
            <Icon type="FontAwesome" name="tablet" />
          )
        }
    },
  Favorite: {
      screen: FavoriteScreen,
      navigationOptions:{
        title: 'Favorite',
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="star" />
        )
      }
    },
  Profile: {
      screen: ProfileScreen,
      navigationOptions:{
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon type="FontAwesome" name="user" />
        )
      }
  }
}));


const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      headerTransparent: true
    }
  }
},
{
  initialRouteName: 'Login',
});

export default createAppContainer(createSwitchNavigator(
  {
    Login: AppNavigator,
    Main: MainNavigator
  },
  {
    initialRouteName: 'Login',
  }
));
