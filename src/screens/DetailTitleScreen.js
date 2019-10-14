import React from 'react';

import { View, Text, Container, Content, Card, CardItem, Body, ListItem, Button, Icon } from 'native-base';
import {  Image, FlatList, StyleSheet, TouchableOpacity, Share, Dimensions } from 'react-native';
import Auth from "../services/Auth";
import axios from "axios";
import env from "../../env";

const {width, height} = Dimensions.get('window');


class DetailTitleScreen extends React.Component {

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
                  <Icon name="share-alt" type="FontAwesome" />
              </Button>
          )
        };
    }

    constructor(props){
        super(props);
        this.state = {
            toon: null,
            countMount: 0,
            episodes: []
        }
    }

    

    

    async componentDidMount(){
        this.setState({
            token: await (new Auth).fetch('token')
        });
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },
            url: `${env.apiUrl}/toon/${this.props.navigation.getParam("id")}`
        }).then(result => {
            this.setState({
                toon: result.data.data.data
            })
            this.props.navigation.setParams({title:this.state.toon.title});
            
        });
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },
            url: `${env.apiUrl}/toon/${this.props.navigation.getParam("id")}/episodes`
        }).then(result => {
            this.setState({episodes: result.data.data.data});
            
        });
    }

    onOpenEpisode = (id) => {
        this.props.navigation.navigate("DetailEpisode",this.state.items.filter((item)=>item.id===id)[0]);
    }

  render(){
    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                        {(this.state.toon)?<Image
                            style={{width: (width*(90/100)), height: 150}}
                            source={{uri: `${env.baseUrl}/${this.state.toon.image}`}} />: <View />}
                            <FlatList style={{marginTop: 30}}
                                data={this.state.episodes}
                                renderItem={({ item }) => 
                                <ListItem>
                                    <TouchableOpacity onPress={this.onOpenEpisode.bind(this, item.id)}>
                                        <Image style={{width: 50, height: 50, borderWidth: 1, borderColor: "#000"}}
                                            source={{uri: `${env.baseUrl}/${item.image}`}} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{marginLeft: 10}} onPress={this.onOpenEpisode.bind(this, item.id)}>
                                        <View>
                                            <Text>{item.title}</Text>
                                            <Text> Oktober 2019</Text>
                                        </View>
                                    </TouchableOpacity>
                                </ListItem>
                                 }
                                keyExtractor={item => item.id.toString()}
                            />
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

export default DetailTitleScreen;