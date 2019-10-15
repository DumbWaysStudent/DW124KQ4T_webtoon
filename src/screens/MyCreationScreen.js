import React from "react";

import { View, Text, Container, Content, Card, CardItem, Fab, Icon, Button, Body, ListItem } from "native-base";
import { FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import axios  from 'axios';
import env  from '../../env';
import Auth  from '../services/Auth';

const {width, height} = Dimensions.get('screen');

class MyCreationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            token: ""
        }
    }

    async componentDidMount(){
        this.setState({
            token: await (new Auth).fetch('token')
        });
        this.onMyToon();
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

    onMyToon = async () => {
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },
            url: `${env.apiUrl}/my-toons`
        }).then(result=>{
            console.log("============");
            console.log(result.data.data.data);
            this.setState({items:result.data.data.data})
        });
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
                                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditToon", item)}>
                                                <Image style={{width: 50, height: 50, borderWidth:1, borderColor: "#000"}}
                                                    source={{uri: `${env.baseUrl}/${item.image}`}} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:10}} onPress={()=>this.props.navigation.navigate("EditToon", item)} style={{marginLeft: 20}}>
                                                <View>
                                                    <Text>{item.title}</Text>
                                                    <Text>{ item.totalEpisode } episode(s)</Text>
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