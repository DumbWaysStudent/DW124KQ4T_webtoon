import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Icon } from 'native-base';
import axios from 'axios';
import env from '../../env';
import Auth from '../services/Auth';

import MyFavoriteCompnent from '../components/MyFavoriteComponent';
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


class FavoriteScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
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
      this.onFavorite();
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
          this.setState({favorites:result.data.data.data});
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
                  <MyFavoriteCompnent items={this.state.favorites} onDetailTitle={this.onDetailTitle} />
                  }
                </Body>
              </CardItem>
          </Content>
        </Container>
    );
  }
};


export default FavoriteScreen;