import React from "react";
import { View, Text, Container, Content, Card, CardItem, Body, Button, Item, Input, Icon, ListItem } from "native-base";

import { FlatList, Image, TouchableOpacity } from "react-native";
import axios from 'axios';
import env from '../../env';


class EditToonScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                if(navigation.getParam("isReady")){
                    var submiting = navigation.state.params;
                    submiting.onEdit = submiting.id;
                    console.log(submiting);
                    delete submiting.isReady;
                    delete submiting.isChanged;
                    delete submiting.errors;
                    navigation.navigate("MyCreation", submiting);
                }
              }}>
                  <Icon name="check" type="FontAwesome" />
            </Button>
          )

        };
    }

    constructor(props){
        super(props)
        this.state={
            id: null,
            image: null,
            title: null,
            episodes: [],
            errors:[],
            isReady: true,
            isChanged: true,
            isNew: false
        }
    }
    componentDidMount(){
        this.onDetail(this.props.navigation.getParam("id"));
        if(this.state.isChanged){

            this.props.navigation.setParams({
                ...this.state
            });
            
            this.setState({
                isChanged: false
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.title !== this.state.title){
            this.props.navigation.setParams({
                title: this.state.title
            });
            
            this.setState({
                title: this.state.title
            });
        }
        if(prevState.isChanged === this.state.isChanged){
            if(this.state.isChanged){
                this.props.navigation.setParams({
                    ...this.state
                })
                
                this.setState({
                    isChanged: false
                });
            }
        }
        if(prevState.episodes === this.state.episodes){
            if(typeof this.props.navigation.getParam('newEpisode') !== "undefined" && this.state.episodes.filter((item)=>item.id===this.props.navigation.getParam('newEpisode').id).length===0){
                var eps = this.state.episodes;
                eps.unshift(this.props.navigation.getParam('newEpisode'));

                this.setState({
                    image: eps[0].images[0].src,
                    episodes: eps,
                    isChanged: true
                });
            }
            if(typeof this.props.navigation.getParam('editEpisode') !== "undefined"){

                var eps = this.props.navigation.getParam('editEpisode');
                this.props.navigation.setParams({editEpisode:undefined});
                var items = this.state.episodes;
                var index = this.state.episodes.findIndex(item => item.id === eps.id);
                items[index] = eps;

                this.setState({
                    image: eps.images[0].src,
                    episodes: [ ...items],
                    isChanged: true
                });
            }
            if(typeof this.props.navigation.getParam('onDelete') !== "undefined"){
                var eps = this.state.episodes.filter((item)=>item.id!==this.props.navigation.getParam('onDelete'));
                this.props.navigation.setParams({onDelete:undefined});


                this.setState({image: (typeof eps[0] !== "undefined")?eps[0].images[0].src:"",
                    episodes: eps,
                    isChanged: true
                });
            }
        }
    }

    onDetail = async (id)=> {
        var obj1=null;
        var obj2 = null;
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `${env.apiUrl}/toon/${id}`
        }).then(result => {
            var item = result.data.data.data
            obj1 = {
                image: item.image,
                title: item.title,
                id: item.id
            };
            
        });
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `${env.apiUrl}/toon/${id}/episodes`
        }).then(result => {
            var item = result.data.data.data
            obj2 = {
                episodes: item,
            }
        });
        this.setState({...obj1,...obj2,isChanged: true});
    }

    onAddEpisode = () => {
        this.props.navigation.navigate("CreateNewEpisode", {edit:this.state.id});
    }

    onChangeTitle = (text) => {
        var error = [];
        if(text === ""){
            error.push("Title is required!");
        }
        

        var allError = this.state.errors.filter((item)=> item.input !== "title");

        var obj ={
            input: "title",
            errors: error
        }
        if(error.length > 0){
            allError.push(obj);
        }

        this.checkError({errors: allError, title: text});

        
    }

    onDelete = () => {
        this.props.navigation.navigate("MyCreation", {onDelete:this.state.id})
    }

    checkError = (json=null) => {
        
        var allError = this.state.errors
        if(json!==null){
            allError = json.errors;
        }

        var isReady = false

        if(allError.length === 0 ){
            isReady= true;
        }

        var state = {...json, isReady: isReady, isChanged: true}
        this.setState(state);
    }

    onEditEpisode = (id) => {
        var item = this.state.episodes.filter((item)=>item.id===id)[0];
        this.props.navigation.navigate("EditEpisode", {edit: item});
    }

    render(){
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.state.title} onChangeText={this.onChangeTitle} placeholder="Title" />
                                </Item>
                                <View  style={{marginTop: 20, marginBottom: 20}}>
                                    <Text>Episode</Text>
                                </View>
                                <FlatList
                                    data={this.state.episodes}
                                    renderItem={({item}) => (
                                        <ListItem>
                                            <Image style={{width: 50, height: 50}} source={{uri:`${env.baseUrl}/${item.image}`}} />
                                            <TouchableOpacity onPress={this.onEditEpisode.bind(this, item.id)} style={{marginLeft: 20}}>
                                                <View>
                                                        <Text>
                                                            {item.title}
                                                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </ListItem>
                                    )}
                                    keyExtractor={(item)=>item.id.toString()}
                                />
                                <Button block light onPress={this.onAddEpisode}>
                                    <Text>Add Episode</Text>
                                </Button>
                                <Button block danger onPress={this.onDelete}>
                                    <Text>Delete</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default EditToonScreen;