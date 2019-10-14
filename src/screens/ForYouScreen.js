/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Container, Content, Item, Input, Card, CardItem, Body, Button, H3, Icon } from 'native-base';
import axios from 'axios';
import env from '../../env';

import BannerComponent from '../components/BannerComponent';
import FavoriteComponent from '../components/FavoriteComponent';
import AllComponent from '../components/AllComponent';


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
          entries : banners,
          banners: []
      }
  }

  componentDidMount(){
      this.onBanner();
  }

  onBanner = async() => {
    await axios({
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        url: `${env.apiUrl}/toons/banner`
    }).then(result=>{
        this.setState({banners:result.data.data.data})
    });
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
                              <BannerComponent items={this.state.banners} onDetailTitle={this.onDetailTitle} />
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

export default ForYouScreen;