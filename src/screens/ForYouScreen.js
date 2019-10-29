import React from 'react';
import { Content, Item, Input, CardItem, Body, Button, H3, Icon, View, Text } from 'native-base';
import { StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../layouts/Layout'


import Toon from '../services/Toon';


import BannerComponent from '../components/BannerComponent';
import FavoriteComponent from '../components/FavoriteComponent';
import AllComponent from '../components/AllComponent';
import SearchComponent from '../components/SearchComponent';

class ForYouScreen extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          keyword: "",
          isLoading: false
      }
  }

  componentDidMount(){
      this.onLoad();
  }

  onLoad = () => {
    this.setState({
        isLoading: true
    });

    this.props.fetchBanner(this.props.auth.data.token);
    this.props.fetchFavorite(this.props.auth.data.token);
    this.props.fetchAll(this.props.auth.data.token);

    this.setState({
        isLoading: false
    });
        
        
  }

  onDetailTitle = (id) => {
      this.props.navigation.navigate("DetailTitle", { id });
  }

  onKeyword = (text) => {
    this.setState({
        keyword: text
    });

    this.props.fetchSearch(this.props.auth.data.token, text);


  }


    onFavorite = (id) => {
        this.props.favoritingToon(this.props.auth.data.token, id);
    }

    successFavorite = () =>{
        this.props.addToonToFavorite(this.props.mytoon.favoriteToonSuccess);
    }


  render() {
      return (
          <Layout screen={"ForYouScreen"} navigation={this.props.navigation}>
              {(this.props.mytoon.isFavoriteToonLoading===false && this.props.mytoon.favoriteToonSuccess)?<>{this.successFavorite()}</>:<></>}
              <Content refreshControl={
                  <RefreshControl
                  onRefresh={this.onLoad}
                  refreshing = {this.state.isLoading} />
              }>
                      <CardItem>
                          <Body>
                              <Item>
                                  <Input placeholder="Search" value={this.state.keyword} onChangeText={this.onKeyword} />
                                  <Button transparent>
                                      <Icon style={styles.iconSearch} type="FontAwesome" name="search" />
                                  </Button>
                              </Item>
                            {(this.props.toon.isBannerLoading && this.props.toon.isFavoriteLoading && this.props.toon.isAllLoading)?<Text>Loading ...</Text>:<></>}
                            </Body>
                        </CardItem>
                        {(!(this.props.toon.isBannerLoading || this.props.toon.isFavoriteLoading || this.props.toon.isAllLoading))?
                            <>
                              { (this.state.keyword!=="") ? (<SearchComponent onDetailTitle={this.onDetailTitle} items={this.props.toon.searchResult} />) : 
                              
                                <>
                                {(this.props.toon.isBannerLoading)?<Text>Loading ...</Text>:
                                    <>
                                        {(this.props.toon.banners.length>0) ? <BannerComponent items={this.props.toon.banners} onDetailTitle={this.onDetailTitle} /> : <View />}    
                                    </>
                                }
                                

                        <CardItem>
                          <Body>
                                
                                    {(this.props.toon.isFavoriteLoading)?
                                        <Text>Loading ...</Text>:
                                        <>
                                            {this.props.toon.favorites.length>0?
                                                <>
                                                <H3>Favorite</H3>
                                                <FavoriteComponent onFavorite={this.onFavorite} items={this.props.toon.favorites} onDetailTitle={this.onDetailTitle} />
                                                </>
                                                :
                                                <></>
                                            }
                                        </>
                                    }
                                
                                
                                

                                
                                {(this.props.toon.isAllLoading)?<Text>Loading</Text>:<>
                                    <H3 style={styles.allTitle}>All</H3>
                                    <AllComponent onFavorite={this.onFavorite} items={this.props.toon.all} onDetailTitle={this.onDetailTitle} />
                                </>}
                                


                          </Body>
                      </CardItem>
                                </>
                              }
                            </>
                        :<></>}
              </Content>
          </Layout>
      );
  
  }
};

const styles = StyleSheet.create({
    allTitle: {marginTop: 10},
    iconSearch: {color:'#3498db'}
});

const mapStateToProps = (state) => {
    return {
        toon: state.toon,
        auth: state.auth,
        mytoon: state.mytoon
    }
}

const mapDispatchToProps = {
    fetchAll: Toon.all,
    fetchBanner: Toon.banner,
    fetchFavorite: Toon.favorite,
    fetchSearch: Toon.search,
    favoritingToon: Toon.favoritingToon,
    addToonToFavorite: Toon.addToonToFavorite
  };

export default connect(mapStateToProps, mapDispatchToProps)(ForYouScreen);