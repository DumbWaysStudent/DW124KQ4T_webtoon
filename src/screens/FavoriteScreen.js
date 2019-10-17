import React from 'react';
import { Container, Content, Item, Input, CardItem, Body, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native';


import axios from "../utils/Api";
import env from '../utils/Env';
import Auth from '../services/Auth';


import MyFavoriteCompnent from '../components/MyFavoriteComponent';
import SearchComponent from '../components/SearchComponent';


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
          url: `/toons/favorite`
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
          url: `/toons/search/${text}`
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
                          <Icon style={styles.iconSearch} type="FontAwesome" name="search" />
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

const styles = StyleSheet.create({
  iconSearch: {color:'#3498db'}
});


export default FavoriteScreen;