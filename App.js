/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Icon} from 'native-base';

import Auth from './src/services/Auth'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FavoriteScreen from './src/screens/FavoriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailTitleScreen from './src/screens/DetailTitleScreen';
import DetailEpisodeScreen from './src/screens/DetailEpisodeScreen';
import ForYouScreen from './src/screens/ForYouScreen';
import LoginScreen from './src/screens/LoginScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import MyCreationScreen from './src/screens/MyCreationScreen';
import CreateNewScreen from './src/screens/CreateNewScreen';
import EditToonScreen from './src/screens/EditToonScreen';
import CreateNewEpisodeScreen from './src/screens/CreateNewEpisodeScreen';
import EditEpisodeScreen from './src/screens/EditEpisodeScreen';
import Coba from './Coba';





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
  EditProfile:{
    screen: EditProfileScreen,
    navigationOptions:{
      title: "Edit Profile"
    }
  },
  MyCreation: {
    screen: MyCreationScreen,
    navigationOptions:{
      title: "My Webtoon"
    }
  },
  CreateNew: {
    screen: CreateNewScreen,
    navigationOptions: {
      title: "Create Webtoon"
    }
  },
  EditToon: {
    screen: EditToonScreen,
    navigationOptions: {
      title: "Edit Webtoon"
    }
  },
  EditEpisode: {
    screen:EditEpisodeScreen,
    navigationOptions:{
      title: "EditEpisode"
    }
  },
  CreateNewEpisode: {
    screen: CreateNewEpisodeScreen,
    navigationOptions: {
      title: "Create Episode"
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
            title: 'Profile',
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
              title: 'Profile',
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
          navigationOptions:({navigation})=>{
            var noBottomTabNav = [
              "MyCreation",
              "CreateNew",
              "CreateNewEpisode",
              "EditToon",
              "EditEpisode",
              "DetailTitle",
              "DetailEpisode"
            ];
            var obj = {
              title: 'Profile',
              tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="user" />
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

const auth = new Auth;

export default createAppContainer(createSwitchNavigator(
  {
    Login: AppNavigator,
    // Login: Coba,
    Main: MainNavigator
  },
  {
    initialRouteName: 'Login',
  }
));
console.disableYellowBox = true;