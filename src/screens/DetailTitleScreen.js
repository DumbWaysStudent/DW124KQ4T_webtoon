import React from 'react';
import { View, Text, Container, Content, CardItem, Body, Button, Icon } from 'native-base';
import {  Image, FlatList, StyleSheet, TouchableOpacity, Share, Dimensions } from 'react-native';
import axios from "axios";


import Auth from "../services/Auth";
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
                  <Icon style={styles.headerRightButtonIcon} name="share-alt" type="FontAwesome" />
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
                'content-type': 'application/json'
            },
            url: `${env.apiUrl}/toon/${this.props.navigation.getParam("id")}/episodes`
        }).then(result => {
            this.setState({episodes: result.data.data.data});
            
        });
    }

    onOpenEpisode = (id) => {
        this.props.navigation.navigate("DetailEpisode",{id});
    }

    formatDate = (time) => {
        var dt = new Date(time);
        var mo = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var string = `${dt.getDate()} ${mo[dt.getMonth()]} ${dt.getFullYear()}`
        return string;
    }

  render(){
    return (
        <Container>
            <Content>
                    {(this.state.toon)?<Image
                        style={styles.coverImage}
                        source={{uri: `${env.baseUrl}/${this.state.toon.image}`}} />: <View />}
                    <CardItem>
                        <Body>
                            <FlatList style={{marginTop: 30}}
                                data={this.state.episodes}
                                renderItem={({ item }) => 
                                <View style={styles.listItem}>
                                    <TouchableOpacity style={styles.buttonImage} onPress={this.onOpenEpisode.bind(this, item.id)}>
                                        <Image style={styles.itemImage} source={{uri: `${env.baseUrl}/${item.image}`}} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.itemTextWrap} onPress={this.onOpenEpisode.bind(this, item.id)}>
                                        <View>
                                            <Text style={styles.labelTitle}>{item.title}</Text>
                                            <Text style={styles.labelDate}>{this.formatDate(item.createdAt)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                 }
                                keyExtractor={item => item.id.toString()}
                            />
                        </Body>
                    </CardItem>
            </Content>
        </Container>
    );
  }
};

const styles = StyleSheet.create({
    coverImage: {width: (width*(100/100)), height: 250},
    listItem: {flex: 1, flexDirection:'row', marginBottom: 15},
    buttonImage: {marginBottom: 10},
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    labelTitle: {marginBottom: 5, marginTop: 5},
    labelDate: {color: "#bdc3c7"},
    headerRightButtonIcon: {color: '#3498db'}
  });

export default DetailTitleScreen;