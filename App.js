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

export default createAppContainer(AppNavigator);
