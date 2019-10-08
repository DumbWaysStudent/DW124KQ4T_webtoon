/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';
import ForYouScreen from './ForYouScreen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';




class MainScreen extends React.Component {

    constructor(props){
        super(props);
    }

    

  render() {
    return (
        <ForYouScreen />
    );
  }
};


export default createAppContainer(
    createBottomTabNavigator(
      {
        ForYou: {
            screen: MainScreen,
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
      }
    )
  );