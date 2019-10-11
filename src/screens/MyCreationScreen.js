import React from "react";

import { View, Text, Container, Content, Card, CardItem, Fab, Icon, Button, Body, ListItem } from "native-base";
import { FlatList, TouchableOpacity, Image, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const banners = [];

class MyCreationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: banners
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.items === this.state.items) {
            if(typeof this.props.navigation.state.params !== "undefined"){
                if(this.props.navigation.getParam('isNew') === true){
                    var submitted = this.props.navigation.state.params;
                    delete submitted.isNew;
                    submitted.id = 1;
                    if(this.state.items.length>0){
                        submitted.id = this.state.items.sort((a, b) => b.id - a.id)[0].id+1;
                    }
                    var items = this.state.items;
                    items.unshift(submitted);
                    this.props.navigation.setParams({isNew: false})
                    this.setState({items:items});
                }
                if(typeof this.props.navigation.getParam('onDelete') !== "undefined"){
                    var time = this.props.navigation.getParam('onDelete');
                    this.props.navigation.setParams({onDelete: undefined});
                    var items = this.state.items.filter((item)=> item.time !== time);
                    this.setState({items:items});
                }
                if(typeof this.props.navigation.getParam('onEdit') !== "undefined"){
                    var time = this.props.navigation.getParam('onEdit');
                    this.props.navigation.setParams({onEdit: undefined});
                    var items = this.state.items;
                    var index = this.state.items.findIndex(item => item.time === time);
                    var submitted = this.props.navigation.state.params;
                    delete submitted.onEdit;
                    items[index] = submitted;
                    this.setState({items:[...items]});

                }
            }
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
                    <Card style={{flex: 1}}>
                        <CardItem>
                            <Body>
                                <FlatList
                                    data = {this.state.items}
                                    keyExtractor = {item => item.id.toString()}
                                    renderItem = {({item})=>(
                                        <ListItem>
                                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditToon", item)}>
                                                <Image style={{width: 50, height: 50}}
                                                    source={item.image} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditToon", item)} style={{marginLeft: 20}}>
                                                <View>
                                                    <Text>{item.title}</Text>
                                                    <Text>{ item.episodes.length } episode(s)</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </ListItem>
                                    )}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{ position: "absolute" }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate("CreateNew")}>
                        <Icon name="plus" type="FontAwesome" />
                </Fab>
            </Container>
        );
    }
}

export default MyCreationScreen