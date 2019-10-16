/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Container, Content, Item, Input, Card, CardItem, Body, Button, H3, Icon, View } from 'native-base';
import axios from 'axios';
import env from '../../env';
import Auth from '../services/Auth';

import BannerComponent from '../components/BannerComponent';
import FavoriteComponent from '../components/FavoriteComponent';
import AllComponent from '../components/AllComponent';
import SearchComponent from '../components/SearchComponent';


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
          entries : [],
          banners: [],
          favorites: [],
          token: "",
          keyword: "",
          searchResult: []
      }
  }

  async componentDidMount(){
      this.setState({
          token: await (new Auth).fetch('token')
      });
      
      this.onBanner();
      this.onFavorite();
      this.onAll();
  }

  onBanner = async() => {
    await axios({
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.state.token}`
        },
        url: `${env.apiUrl}/toons/banner`
    }).then(result=>{
        this.setState({banners:result.data.data.data})
    });
  }

  onFavorite = async() => {
    await axios({
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.state.token}`
        },
        url: `${env.apiUrl}/toons/favorite`
    }).then(result=>{
        this.setState({favorites:result.data.data.data})
    });
  }

  onAll = async() => {
    await axios({
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.state.token}`
        },
        url: `${env.apiUrl}/toons/all`
    }).then(result=>{
        this.setState({entries:result.data.data.data})
    });
  }

  onDetailTitle = (id) => {
      this.props.navigation.navigate("DetailTitle", {id});
  }

  onKeyword = async (text) => {
    this.setState({
        keyword: text
    });

    await axios({
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            "authorization": `Bearer ${this.state.token}`
        },
        url: `${env.apiUrl}/toons/search/${text}`
    }).then(result => {
        // this.setState({
        //     toons: result.data.data.data
        // })
        this.setState({searchResult: result.data.data.data});
        
    })
  }




  render() {
      return (
          <Container>
              <Content>
                      <CardItem>
                          <Body>
                              <Item>
                                  <Input placeholder="Search" value={this.state.keyword} onChangeText={this.onKeyword} />
                                  <Button transparent>
                                      <Icon style={{color:'#3498db'}} type="FontAwesome" name="search" />
                                  </Button>
                              </Item>
                              { (this.state.keyword!=="") ? (<SearchComponent onDetailTitle={this.onDetailTitle} items={this.state.searchResult} />) : 
                              
                                <>
                                {(this.state.banners.length>0) ? <BannerComponent items={this.state.banners} onDetailTitle={this.onDetailTitle} /> : <View />}

                                
                                {this.state.favorites.length>0?
                                    <>
                                    <H3>Favorite</H3>
                                    <FavoriteComponent items={this.state.favorites} onDetailTitle={this.onDetailTitle} />
                                    </>
                                    :
                                    <>
                                    <H3>Favorite</H3>
                                    <FavoriteComponent items={this.state.banners} onDetailTitle={this.onDetailTitle} />
                                    </>
                                }
                                

                                <H3>All</H3>
                                <AllComponent items={this.state.entries} onDetailTitle={this.onDetailTitle} />
                                </>
                              }
                          </Body>
                      </CardItem>
              </Content>
          </Container>
      );
  
  }
};

export default ForYouScreen;