/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './src/screens/LoginScreen';
import ForYouScreen from './src/screens/ForYouScreen';

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      headerTransparent: true
    }
  },
  Main: {
    screen: ForYouScreen,
    navigationOptions: {
      headerTransparent: true,
      headerLeft: null
    }
  }
},
{
  initialRouteName: 'Login',
});

export default createAppContainer(AppNavigator);
