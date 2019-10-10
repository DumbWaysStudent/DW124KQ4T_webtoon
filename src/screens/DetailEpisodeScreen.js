import React from 'react';

import { Container, Content, Card, CardItem, Body, Button, Icon } from 'native-base';
import {  Image, FlatList, Dimensions } from 'react-native';
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
                            <Body>
                            <FlatList
                                data={this.state.items}
                                renderItem={({ item }) => 
                                    <Image style={{width: width, height: 300}}
                                        source={{uri: item.image}} />
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
}

export default DetailEpisodeScreen;