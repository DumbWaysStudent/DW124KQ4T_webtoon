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
import DetailTitleScreen from './src/screens/DetailTitleScreen';
import DetailEpisodeScreen from './src/screens/DetailEpisodeScreen';
import ForYouScreen from './src/screens/ForYouScreen';
import LoginScreen from './src/screens/LoginScreen';




const ForYouStack = createStackNavigator({
  ForYou: {
    screen: ForYouScreen,
    navigationOptions:{
      headerTransparent: true
    }
  },
  DetailTitle: {
    screen:DetailTitleScreen,
    navigationOptions:{
      gesturesEnabled: false,
      tabBarVisible: false
      
    }
  },
  DetailEpisode:{
    screen:DetailEpisodeScreen,
    navigationOptions:{
      gesturesEnabled: false,
      tabBarVisible: false
      
    }
  }
});

const FavoriteStack = createStackNavigator({
  Favorite: {
    screen: FavoriteScreen,
    navigationOptions:{
      headerTransparent: true
    }
  },
  DetailTitle: {
    screen:DetailTitleScreen,
    navigationOptions:{
      gesturesEnabled: false,
      tabBarVisible: false
      
    }
  },
  DetailEpisode:{
    screen:DetailEpisodeScreen,
    navigationOptions:{
      gesturesEnabled: false,
      tabBarVisible: false
      
    }
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      title: "Profile"
    }
  },
  DetailTitle: {
    screen:DetailTitleScreen,
    navigationOptions:{
      gesturesEnabled: false,
      tabBarVisible: false
      
    }
  },
  DetailEpisode:{
    screen:DetailEpisodeScreen,
    navigationOptions:{
      gesturesEnabled: false,
      tabBarVisible: false
      
    }
  }
});




const MainNavigator = createAppContainer(createBottomTabNavigator({
      ForYou: {
        screen: ForYouStack,
        navigationOptions:({navigation})=>{
            var noBottomTabNav = [
              "DetailTitle",
              "DetailEpisode"
            ];
            var obj = {
              title: 'For You',
              tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="tablet" />
              )
            };
            if(noBottomTabNav.indexOf(navigation.state.routes[navigation.state.index].routeName) >= 0){
              obj.tabBarVisible = false;
            }
            else{
              obj.tabBarVisible = true;
            }
            return obj
          }
        },
      Favorite: {
          screen: FavoriteStack,
          navigationOptions:({navigation})=>{
            var noBottomTabNav = [
              "DetailTitle",
              "DetailEpisode"
            ];
            var obj = {
              title: 'Favorite',
              tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="star" />
              )
            };
            if(noBottomTabNav.indexOf(navigation.state.routes[navigation.state.index].routeName) >= 0){
              obj.tabBarVisible = false;
            }
            else{
              obj.tabBarVisible = true;
            }
            return obj
          }
      },
      Profile: {
          screen: ProfileStack,
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
