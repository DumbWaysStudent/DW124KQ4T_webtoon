import React from 'react';

import { Container, Content, Button, Icon, View } from 'native-base';
import {  Image, FlatList, Dimensions, Share, StyleSheet } from 'react-native';
import axios from 'axios';
import env from '../../env';
import Auth from '../services/Auth';
const {width, height} = Dimensions.get('window');


class DetailEpisodeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title'),
          headerRight: (
            <Button transparent
              onPress={()=> Share.share(
                {
                  title: "a title",
                  message: "some message",
                  url: "www.example.com"
                }
            )}>
                  <Icon style={styles.headerRightButtonIcon} name="share-alt" type="FontAwesome" />
              </Button>
          )
        };
    }

    constructor(props){
        super(props);
        this.state = {
            countMount: 0,
            episode: null,
            token: ""
        }
    }

    async componentDidMount(){
        this.setState({
            token: await (new Auth).fetch('token')
        });
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `${env.apiUrl}/toon-episode/${this.props.navigation.getParam("id")}`
        }).then(async result => {
            var episode = result.data.data.data;
            for(var i =0;i<episode.images.length;i++){
                await Image.getSize(`${env.baseUrl}/${episode.images[i].url}`, (w, h) => {
                    var wi = width*(100/100);
                    episode.images[i].width=wi;
                    episode.images[i].height=h*(wi/w);
                });
            }
            this.setState({
                episode: result.data.data.data
            })
            this.props.navigation.setParams({title:this.state.episode.title});
            
        });
    }
    render(){
        return (
            <Container>
                <Content>
                                {this.state.episode ?
                                    <FlatList
                                        data={this.state.episode.images}
                                        renderItem={({ item }) => 
                                            <Image style={{width:item.width, height: item.height}}
                                                source={{uri: `${env.baseUrl}/${item.url}`}} />
                                            }
                                        keyExtractor={item => item.id.toString()}
                                    />
                                : <View /> }
                    
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerRightButtonIcon: {color:'#3498db'}
});

export default DetailEpisodeScreen;