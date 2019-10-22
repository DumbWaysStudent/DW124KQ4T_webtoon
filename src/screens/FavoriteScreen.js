import React from 'react';
import { Container, Content, Item, Input, CardItem, Body, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native';


import axios from "../utils/Api";
import { connect } from 'react-redux'


import Toon from '../services/Toon';
import { saveFavorite } from '../_actions/toon';


import Layout from '../layouts/Layout';
import MyFavoriteCompnent from '../components/MyFavoriteComponent';
import SearchComponent from '../components/SearchComponent';


class FavoriteScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          keyword: "",
          searchResult: []
        }
    }

    async componentDidMount(){
      var favorites = [];

      try{
        favorites = (await Toon.favorite()).data.data.data
      }
      catch(err){
        console.log(err);
      }

      this.props.dispatch(saveFavorite(favorites));
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
        <Layout screen={"FavoriteScreen"} navigation={this.props.navigation}>
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
                  <MyFavoriteCompnent items={this.props.toon.favorites} onDetailTitle={this.onDetailTitle} />
                  }
                </Body>
              </CardItem>
          </Content>
        </Layout>
    );
  }
};

const styles = StyleSheet.create({
  iconSearch: {color:'#3498db'}
});


const mapStateToProps = (state) => {
  return {
      toon: state.toon
  }
}

export default connect(mapStateToProps)(FavoriteScreen);