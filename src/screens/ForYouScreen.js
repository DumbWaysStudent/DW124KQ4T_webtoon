/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H3, Icon, View } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';
import DetailTitleScreen from './DetailTitleScreen';




import BannerComponent from '../components/BannerComponent';
import FavoriteComponent from '../components/FavoriteComponent';
import AllComponent from '../components/AllComponent';
import DetailEpisodeScreen from './DetailEpisodeScreen';




const banners = [{
    id: 1,
    title: 'The Secret of Angel',
    image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 2,
    title: 'Pasutri Gaje',
    image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 3,
    title: 'Young Mom',
    image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}];



class ForYouScreen extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          entries : banners
      }
  }

  onDetailTitle = (id) => {
      var item = this.state.entries.filter((item, index)=> item.id === id)[0];
      this.props.navigation.navigate("DetailTitle", item);
  }



  render() {
      return (
          <Container>
              <Content>
                  <Card>
                      <CardItem>
                          <Body>
                              <Item>
                                  <Input placeholder="Search" />
                                  <Button transparent>
                                      <Icon type="FontAwesome" name="search" />
                                  </Button>
                              </Item>
                              <BannerComponent items={this.state.entries} onDetailTitle={this.onDetailTitle} />
                              <H3>Favorite</H3>
                              <FavoriteComponent items={this.state.entries} onDetailTitle={this.onDetailTitle} />
                              <H3>All</H3>
                              <AllComponent items={this.state.entries} onDetailTitle={this.onDetailTitle} />
                          </Body>
                      </CardItem>
                  </Card>
              </Content>
          </Container>
      );
  
  }
};

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


export default createAppContainer(
    createBottomTabNavigator(
      {
        ForYou: {
          screen: ForYouStack,
          navigationOptions:{
            title: "For You",
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