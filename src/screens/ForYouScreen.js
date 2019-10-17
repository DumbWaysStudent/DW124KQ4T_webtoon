import React from 'react';
import { Container, Content, Item, Input, CardItem, Body, Button, H3, Icon, View } from 'native-base';
import { StyleSheet } from 'react-native';


import Toon from '../services/Toon';


import BannerComponent from '../components/BannerComponent';
import FavoriteComponent from '../components/FavoriteComponent';
import AllComponent from '../components/AllComponent';
import SearchComponent from '../components/SearchComponent';


class ForYouScreen extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          entries : [],
          banners: [],
          favorites: [],
          keyword: "",
          searchResult: []
      }
  }

  async componentDidMount(){
      
        var banners = [];
        var favorites = [];
        var entries = [];
        
        await Toon.banner().then(result=> banners = result.data.data.data ).catch(err=> console.log(err.response));
        await Toon.favorite().then(result=> favorites = result.data.data.data );
        await Toon.all().then(result=> entries = result.data.data.data );

        this.setState({ banners, favorites, entries })
  }

  onDetailTitle = (id) => {
      this.props.navigation.navigate("DetailTitle", { id });
  }

  onKeyword = async (text) => {
    this.setState({
        keyword: text
    });

    await toon.search(text).then(result => {
        this.setState({searchResult: result.data.data.data});
    });
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
                            </Body>
                        </CardItem>
                              { (this.state.keyword!=="") ? (<SearchComponent onDetailTitle={this.onDetailTitle} items={this.state.searchResult} />) : 
                              
                                <>
                                {(this.state.banners.length>0) ? <BannerComponent items={this.state.banners} onDetailTitle={this.onDetailTitle} /> : <View />}

                        <CardItem>
                          <Body>
                                
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

                                

                                <H3 style={styles.allTitle}>All</H3>
                                <AllComponent items={this.state.entries} onDetailTitle={this.onDetailTitle} />


                          </Body>
                      </CardItem>
                                </>
                              }
              </Content>
          </Container>
      );
  
  }
};

const styles = StyleSheet.create({
    allTitle: {marginTop: 10},
    iconSearch: {color:'#3498db'}
});

export default ForYouScreen;