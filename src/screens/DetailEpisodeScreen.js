import React from 'react';

import { View, Text, Container, Content, Card, CardItem, Body, ListItem, Button, Icon } from 'native-base';
import {  Image, FlatList, SafeAreaView, StyleSheet } from 'react-native';



class DetailEpisodeScreen extends React.Component {
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
            countMount: 0,
            items: [],
            item: props.navigation.state.params
        }
    }

    componentDidMount(){
        if(this.state.countMount === 0){
            var items = this.state.items;
            for(var i=35;i>0;i-=7){
                var item = {
                    id: ((i+7)),
                    image: this.state.item.image
                }
                items.push(item);
            }

            this.setState({
                countMount: this.state.countMount+1
            });
        }
    }

    render(){
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <FlatList
                                data={this.state.items}
                                renderItem={({ item }) => 
                                    <Image style={{width: 370, height: 300}}
                                        source={{uri: item.image}} />
                                    }
                                keyExtractor={item => item.id.toString()}
                            />
                        </CardItem>
                    </Card>
                    
                </Content>
            </Container>
        );
    }
}

export default DetailEpisodeScreen;