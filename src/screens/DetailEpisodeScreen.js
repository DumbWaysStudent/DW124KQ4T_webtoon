import React from 'react';
import { Container, Content, Button, Icon, View, Header, Left, Title, Right, Body } from 'native-base';
import {  Image, FlatList, Dimensions, Share, StyleSheet } from 'react-native';


import env from '../utils/Env';
import Toon from '../services/Toon';


const {width, height} = Dimensions.get('window');


class DetailEpisodeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countMount: 0,
            episode: null
        }
    }

    async componentDidMount(){
        await Toon.episodeDetail(1, this.props.navigation.getParam("id")).then(async result => {
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
            <Container style={{paddingTop: 25}}>
                <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color: "#3498db"}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:"#000"}}>{this.props.navigation.getParam('title')}</Title>
                    </Body>
                    <Right>
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
                    </Right>
                </Header>
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