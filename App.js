/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Icon} from 'native-base';

import { Provider } from 'react-redux';
import store from './src/_redux/store';

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
      headerTransparent: true,
      headerLeft: null
      
    }
  },
  DetailEpisode:{
    screen:DetailEpisodeScreen,
    navigationOptions:{
      headerTransparent: true,
      headerLeft: null
      
    }
  }
});

const FavoriteStack = createStackNavigator({
  Favorite: {
    screen: FavoriteScreen,
    navigationOptions:{
      headerTransparent: true,
      headerLeft: null
    }
  },
  DetailTitle: {
    screen:DetailTitleScreen,
    navigationOptions:{
      headerTransparent: true,
      headerLeft: null
      
    }
  },
  DetailEpisode:{
    screen:DetailEpisodeScreen,
    navigationOptions:{
      headerTransparent: true,
      headerLeft: null
      
    }
  }
});




const MainNavigator = createAppContainer(createStackNavigator({
      ForYou: {
        screen: ForYouStack,
        navigationOptions:{
          headerTransparent: true,
          headerLeft: null
        }
      },
      Favorite: {
          screen: FavoriteStack,
          navigationOptions:{
            headerTransparent: true,
            headerLeft: null
          }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions:{
          headerTransparent: true,
          headerLeft: null
        }
      },
      EditProfile:{
        screen: EditProfileScreen,
        navigationOptions:{
          headerTransparent: true,
          headerLeft: null
        }
      },
      MyCreation: {
        screen: MyCreationScreen,
        navigationOptions:{
          headerTransparent: true,
          headerLeft: null
        }
      },
      CreateNew: {
        screen: CreateNewScreen,
        navigationOptions: {
          headerTransparent: true,
          headerLeft: null
        }
      },
      EditToon: {
        screen: EditToonScreen,
        navigationOptions: {
          headerTransparent: true,
          headerLeft: null
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
          headerTransparent: true,
          headerLeft: null
        }
      },
      DetailTitle: {
        screen:DetailTitleScreen,
        navigationOptions:{
          headerTransparent: true,
          headerLeft: null
          
        }
      },
      DetailEpisode:{
        screen:DetailEpisodeScreen,
        navigationOptions:{
          headerTransparent: true,
          headerLeft: null
          
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
const RegNavigator = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions:{
      headerTransparent: true
    }
  }
});

const MainApp = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  )
}


const RootNavigation = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    Register: RegNavigator,
    Login: AppNavigator,
    // Login: Coba,
    Main: MainApp
  },
  {
    initialRouteName: 'AuthLoading',
  }
));





const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}

export default App;
console.disableYellowBox = true;