import React from 'react';
import { View, Text, Container, Content, CardItem, Body, Button, Icon, Header, Left, Title, Right } from 'native-base';
import {  Image, FlatList, StyleSheet, TouchableOpacity, Share, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import env from '../utils/Env';
import Toon from '../services/Toon';


const {width, height} = Dimensions.get('window');

class DetailTitleScreen extends React.Component {


    constructor(props){
        super(props);
    }

    async componentDidMount(){
        
        this.props.fetchDetailToon(this.props.navigation.getParam("id"));
        this.props.fetchEpisodeToon(this.props.navigation.getParam("id"));
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
        <Container style={{paddingTop: 25}}>
            <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
                <Left>
                    <Button transparent onPress={()=>this.props.navigation.goBack()}>
                    <Icon name='arrow-back' style={{color: "#3498db"}} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:"#000"}}>{(this.props.toon.detailToon!==null)?this.props.toon.detailToon.title:<></>}</Title>
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
                    {(this.props.toon.detailToon!==null)?<Image
                        style={styles.coverImage}
                        source={{uri: `${env.baseUrl}/${this.props.toon.detailToon.image}`}} />: <View />}
                    <CardItem>
                        <Body>
                            <FlatList style={{marginTop: 30}}
                                data={this.props.toon.episodeToon}
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

const mapStateToProps = (state) => ({
    toon: state.toon
})

const mapDispatchToProps = {
    fetchDetailToon: Toon.detail,
    fetchEpisodeToon: Toon.episodeList
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTitleScreen);