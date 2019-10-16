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
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import FavoriteScreen from './src/screens/FavoriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailTitleScreen from './src/screens/DetailTitleScreen';
import DetailEpisodeScreen from './src/screens/DetailEpisodeScreen';
import ForYouScreen from './src/screens/ForYouScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import MyCreationScreen from './src/screens/MyCreationScreen';
import CreateNewScreen from './src/screens/CreateNewScreen';
import EditToonScreen from './src/screens/EditToonScreen';
import CreateNewEpisodeScreen from './src/screens/CreateNewEpisodeScreen';
import EditEpisodeScreen from './src/screens/EditEpisodeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
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




const MainNavigator = createAppContainer(createMaterialBottomTabNavigator({
      ForYou: {
        screen: ForYouStack,
        navigationOptions:({navigation})=>{
          var noBottomTabNav = [
            "DetailTitle",
            "DetailEpisode"
          ];
          var obj = {
            tabBarIcon: ({ tintColor }) => (
              <Icon type="FontAwesome" name="tablet" style={{color: tintColor}} />
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
              tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="star" style={{color: tintColor}} />
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
              tabBarIcon: ({ tintColor }) => (
                <Icon type="FontAwesome" name="user" style={{color: tintColor}} />
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
},{
  // tabBarOptions: {
  //   showLabel: false,
  //   activeTintColor: '#ecf0f1',
  //   inactiveTintColor: '#bdc3c7',
  //   labelStyle: {
  //     fontSize: 12,
  //   },
  //   style: {
  //     backgroundColor: '#2980b9',
  //   },
  // }
  labeled: false,
  activeColor: '#ecf0f1',
  inactiveColor: '#bdc3c7',
  barStyle: { backgroundColor: '#2980b9' },
}));

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      headerTransparent: true
    }
  }
});
const RegNavigator = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions:{
      headerTransparent: true
    }
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    Register: RegNavigator,
    Login: AppNavigator,
    // Login: Coba,
    Main: MainNavigator
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
console.disableYellowBox = true;