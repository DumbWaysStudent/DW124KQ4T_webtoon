import React from "react";

import { View, Text, Container, Content, Card, CardItem, Fab, Icon, Button, Body, ListItem } from "native-base";
import { FlatList, TouchableOpacity, Image } from "react-native";

const banners = [{
    id: 1,
    title: 'The Secret of Angel',
    image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 2,
    title: 'Pasutri Gaje',
    image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
  }, {
    id: 3,
    title: 'Young Mom',
    image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}];

class MyCreationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: banners
        }
    }

    onDetailTitle = (id) => {
        var item = this.state.items.filter((item, index)=> item.id === id)[0];
        this.props.navigation.navigate("DetailTitle", item);
    }

    render(){
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <FlatList
                                    data = {this.state.items}
                                    keyExtractor = {item => item.id.toString()}
                                    renderItem = {({item})=>(
                                        <ListItem>
                                            <TouchableOpacity>
                                                <Image style={{width: 50, height: 50}}
                                                    source={{uri: item.image}} />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Text>{item.title}</Text>
                                                    <Text>20 episode(s)</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </ListItem>
                                    )}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <View style={{ flex: 1 }}>
                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => console.log("nice")}>
                        <Icon name="plus" type="FontAwesome" />
                </Fab>
                </View>
            </Container>
        );
    }
}

export default MyCreationScreen