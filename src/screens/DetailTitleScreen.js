import React from 'react';

import { View, Text, Container, Content, Card, CardItem, Body, ListItem, Button, Icon } from 'native-base';
import {  Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';



class DetailTitleScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title'),
          headerRight: (
            <Button transparent
              onPress={() => alert('This is a button!')}>
                  <Icon name="share-alt" type="FontAwesome" />
              </Button>
          )
        };
    }

    constructor(props){
        super(props);
        this.state = {
            item: props.navigation.state.params,
            countMount: 0,
            items: []
        }
    }

    

    

    componentDidMount(){
        if(this.state.countMount === 0){
            var items = this.state.items;
            for(var i=35;i>0;i-=7){
                var item = {
                    id: ((i+7)),
                    title: this.state.item.title + " Ep. " + (((i+7)/7)-1),
                    image: this.state.item.image
                }
                items.push(item);
            }
            this.setState({
                items: items,
                countMount: this.state.countMount+1
            });
        }
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
                        <Image
                            style={{width: 210, height: 150}}
                            source={{uri: this.state.item.image}} />
                            <FlatList style={{marginTop: 30}}
                                data={this.state.items}
                                renderItem={({ item }) => 
                                <ListItem>
                                    <TouchableOpacity onPress={this.onOpenEpisode.bind(this, item.id)}>
                                        <Image style={{width: 50, height: 50}}
                                            source={{uri: item.image}} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onOpenEpisode.bind(this, item.id)}>
                                        <View>
                                            <Text>{item.title}</Text>
                                            <Text>{item.id-13} Oktober 2019</Text>
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