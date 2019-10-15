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
            token: "",
            sending: 0
        }
    }

    async componentDidMount(){
        this.setState({
            token: await (new Auth).fetch('token')
        });
        this.onMyToon();
    }

    async componentDidUpdate(prevProps, prevState){
        if(prevState.items === this.state.items) {
            if(typeof this.props.navigation.state.params !== "undefined"){
                if(this.props.navigation.getParam('isNew') === true){
                        await this.onSubmitNew({
                            image: "",
                            title: this.props.navigation.getParam("title")
                        });
                }
                if(typeof this.props.navigation.getParam('onDelete') !== "undefined"){
                    var id = this.props.navigation.getParam('onDelete');
                    await this.onDelete(id);
                }
                if(typeof this.props.navigation.getParam('onEdit') !== "undefined"){
                    var id = this.props.navigation.getParam('onEdit');
                    await this.onSubmitUpdate({
                        title: this.props.navigation.getParam('title'),
                        image: this.props.navigation.getParam('image')
                    }, id);

                }
            }
        }
    }

    onDelete = async (id) => {
        this.props.navigation.setParams({onDelete: undefined});

        await axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },   
            url: `${env.apiUrl}/toon/${id}`
        }).then(result=>{
            var items = this.state.items.filter((item)=> item.id !== id);
            this.setState({items:items});
        });
    }

    onSubmitUpdate = async (data, id) => {
        this.props.navigation.setParams({onEdit: undefined});
        axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },
            data: data,          
            url: `${env.apiUrl}/toon/${id}/edit`
        }).then(result=>{
            var items = this.state.items;
            var index = this.state.items.findIndex(item => item.id === id);
            items[index] = result.data.data.data;
            var obj = {items:[...items]};
            this.setState({...obj});
        });
    }

    onSubmitNew = async (data) => {
        axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },
            data: data,          
            url: `${env.apiUrl}/toon/create`
        }).then(result=>{
            var items = this.state.items;
            items.unshift(result.data.data.data);
            this.setState({
                items: [...items]
            });
        }).catch();
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
                                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditToon", {id:item.id})}>
                                                {item.image==="" ?
                                                <View style={{width: 50, height: 50, borderWidth:1, borderColor: "#000"}} />
                                                : 
                                                <Image style={{width: 50, height: 50, borderWidth:1, borderColor: "#000"}}
                                                    source={{uri: `${env.baseUrl}/${item.image}`}} />
                                                }
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginLeft:10}} onPress={()=>this.props.navigation.navigate("EditToon", {id:item.id})} style={{marginLeft: 20}}>
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