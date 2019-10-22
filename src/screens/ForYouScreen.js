import React from 'react';
import { Container, Content, Item, Input, CardItem, Body, Button, H3, Icon, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../layouts/Layout'


import Toon from '../services/Toon';
import { saveBanner, saveFavorite, saveAll } from '../_actions/toon';


import BannerComponent from '../components/BannerComponent';
import FavoriteComponent from '../components/FavoriteComponent';
import AllComponent from '../components/AllComponent';
import SearchComponent from '../components/SearchComponent';


class ForYouScreen extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          keyword: "",
          searchResult: []
      }
  }

  async  componentDidMount(){
      await this.onLoad();
  }

  onLoad = async () => {
      
        let banners = [];
        let favorites = [];
        let all = [];

        try{
            banners = await Toon.banner();
        }
        catch(err){
            console.log(err);
        }

        try{
            favorites = await Toon.favorite();
        }
        catch(err){
            console.log(err);
        }

        try{
            all = await Toon.all();
        }
        catch(err){
            console.log(err);
        }
        
        this.props.dispatch(saveBanner(banners.data.data.data));
        this.props.dispatch(saveFavorite(favorites.data.data.data));
        this.props.dispatch(saveAll(all.data.data.data));
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
          <Layout screen={"ForYouScreen"} navigation={this.props.navigation}>
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
                                {(this.props.toon.banners.length>0) ? <BannerComponent items={this.props.toon.banners} onDetailTitle={this.onDetailTitle} /> : <View />}

                        <CardItem>
                          <Body>
                                
                                {this.props.toon.favorites.length>0?
                                    <>
                                    <H3>Favorite</H3>
                                    <FavoriteComponent items={this.props.toon.favorites} onDetailTitle={this.onDetailTitle} />
                                    </>
                                    :
                                    <>
                                    <H3>Favorite</H3>
                                    <FavoriteComponent items={this.props.toon.banners} onDetailTitle={this.onDetailTitle} />
                                    </>
                                }

                                

                                <H3 style={styles.allTitle}>All</H3>
                                <AllComponent items={this.props.toon.all} onDetailTitle={this.onDetailTitle} />


                          </Body>
                      </CardItem>
                                </>
                              }
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
        toon: state.toon
    }
}

export default connect(mapStateToProps)(ForYouScreen);