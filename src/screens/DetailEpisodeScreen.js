import React from 'react';
import { Container, Content, Button, Icon, View, Header, Left, Title, Right, Body, Text } from 'native-base';
import {  Image, FlatList, Dimensions, Share, StyleSheet, RefreshControl } from 'react-native';

import {connect} from 'react-redux';
import env from '../utils/Env';
import Toon from '../services/Toon';


const {width, height} = Dimensions.get('window');


class DetailEpisodeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countMount: 0,
            episode: null,
            images: [],
            isLoading: false
        }
    }

    async componentDidMount(){
        this.props.fetchDetailEpisode(1, this.props.navigation.getParam("id"), width);

    }
    onLoad = () => {
        this.setState({
            isLoading: true
        });
        this.props.fetchDetailEpisode(1, this.props.navigation.getParam("id"), width);
        this.setState({
            isLoading: false
        });
    }
    handleSize = (images) =>{
        images.map((item,i)=>{
            let index = this.state.images.findIndex(a => a.id === item.id);

            if(index<0){
                Image.getSize(`${env.baseUrl}/${item.url}`, (w, h) => {

                    
                    let newData = item;
                    newData.width=width;
                    newData.height=h*(width/w);
                    let ntap = this.state.images;
                    ntap.push(newData);
                    this.setState({
                        images: ntap
                    });
                });
            }
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
                        <Title style={{color:"#000"}}>{(this.props.toon.imageEpisode)?this.props.toon.imageEpisode.title:""}</Title>
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
                {(this.props.toon.imageEpisode)?<>{this.handleSize(this.props.toon.imageEpisode.images)}</>:<></>}
                <Content refreshControl={<RefreshControl
                  onRefresh={this.onLoad}
                  refreshing = {this.state.isLoading} />
              }>
                                {!this.props.toon.isImageEpisodeLoading ?
                                    <FlatList
                                        data={(this.props.toon.imageEpisode)?this.state.images:[]}
                                        renderItem={({ item }) => <>
                                            <Image style={{width:item.width, height: item.height}}
                                                source={{uri: `${env.baseUrl}/${item.url}`}} />
                                                </>
                                            }
                                        keyExtractor={item => item.id.toString()}
                                    />
                                : <Text>Loading ...</Text> }
                    
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerRightButtonIcon: {color:'#3498db'}
});

const mapStateToProps = (state) => ({
    toon: state.toon
})

const mapDispatchToProps = {
    fetchDetailEpisode: Toon.episodeDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailEpisodeScreen);