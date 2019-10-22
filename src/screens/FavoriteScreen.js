import React from 'react';
import { Content, Item, Input, CardItem, Body, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native';


import { connect } from 'react-redux'


import Toon from '../services/Toon';


import Layout from '../layouts/Layout';
import MyFavoriteCompnent from '../components/MyFavoriteComponent';
import SearchComponent from '../components/SearchComponent';
import { Text } from 'react-native-paper';


class FavoriteScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          keyword: ""
        }
    }

    componentDidMount(){
      this.props.fetchFavorite(this.props.auth.data.token);
    }


    onDetailTitle = (id) => {
        this.props.navigation.navigate("DetailTitle", {id});
    }


    onKeyword = async (text) => {
      this.setState({
          keyword: text
      });
  
      this.props.fetchSearch(this.props.auth.data.token, text);
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
                  { (this.state.keyword!=="") ? (<SearchComponent onDetailTitle={this.onDetailTitle} items={this.props.toon.searchResult} />) :
                  <>
                    {(this.props.toon.isFavoriteLoading)?<Text>Loading ...</Text>:<MyFavoriteCompnent items={this.props.toon.favorites} onDetailTitle={this.onDetailTitle} />}
                  </>
                  
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
      toon: state.toon,
      auth: state.auth
  }
}

const mapDispatchToProps = {
  fetchFavorite: Toon.favorite,
  fetchSearch: Toon.search
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);