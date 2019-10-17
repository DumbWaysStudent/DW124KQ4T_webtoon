import React from "react";
import { View, Text, Container, Content, CardItem, Body, Button, Item, Input, Icon } from "native-base";
import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";


import env from '../utils/Env';
import Toon from '../services/Toon';


class EditToonScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                if(navigation.getParam("isReady")){
                    var submiting = navigation.state.params;
                    submiting.onEdit = submiting.id;
                    delete submiting.isReady;
                    delete submiting.isChanged;
                    delete submiting.errors;
                    navigation.navigate("MyCreation", submiting);
                }
              }}>
                  <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
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
            isNew: false,
            epsCheck: []
        }
    }
    async componentDidMount(){
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

    async componentDidUpdate(prevProps, prevState){
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
            if(typeof this.props.navigation.getParam('newEpisode') !== "undefined" && this.state.epsCheck.filter((item)=>item.time===this.props.navigation.getParam('newEpisode').time).length===0){
                await this.onNewEpisode(this.props.navigation.getParam('newEpisode'));
            }
            if(typeof this.props.navigation.getParam('editEpisode') !== "undefined"){

                var eps = this.props.navigation.getParam('editEpisode');
                await this.onUpdateEpisode(eps);
                
            }
            if(typeof this.props.navigation.getParam('onDelete') !== "undefined"){
                
                this.onDeleteEpisode(this.props.navigation.getParam('onDelete'));
            }
        }
    }

    onDeleteEpisode = async (id) => {
        var eps = this.state.episodes.filter((item)=>item.id!==id);
        
        this.props.navigation.setParams({onDelete:undefined});

        await Toon.deleteEpisode(id).then(result=>{
            this.setState({
                episodes: eps,
                isChanged: true
            });
        });

        
    }

    onUpdateEpisode = async (data) => {
        this.props.navigation.setParams({editEpisode:undefined});

        await Toon.updateEpisode({
            title:data.name
        }, data.id).then(result=>{
            var items = this.state.episodes;
            var index = this.state.episodes.findIndex(item => item.id === data.id);
            items[index].title = data.name;

            this.setState({
                episodes: [ ...items],
                isChanged: true
            });
        });
    }

    onNewEpisode = async (data) => {
        this.props.navigation.setParams({...{
            newEpisode: undefined
        }});
        var form = {
            "title": data.name,
            "toonId": this.state.id
        }
        for(var i=0;i<data.images.length;i++){
            form["images[]"] = data.images[i].img;
        }
        await Toon.createEpisode(form).then(result=>{
            var item = result.data.data.data;
            var eps = this.state.episodes;
            var epsCheck = this.state.epsCheck;
            epsCheck.unshift(data);
            eps.unshift(item);

            this.setState({
                image: eps[0].image,
                episodes: [...eps],
                epsCheck: [...epsCheck],
                isChanged: true
            });
            
        }).catch(error=>{
            console.log("====error=====");
            console.log(error);
            console.log("====error.response=====");
            console.log(error.response);
        });
    }

    onDetail = async (id)=> {
        var obj1=null;
        var obj2 = null;
        await Toon.detail(id).then(result => {
            var item = result.data.data.data
            obj1 = {
                image: item.image,
                title: item.title,
                id: item.id
            };
            
        });
        await Toon.episodeList(id).then(result => {
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
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.state.title} onChangeText={this.onChangeTitle} placeholder="Title" />
                                </Item>
                                <View  style={styles.labelEpisode}>
                                    <Text>Episode</Text>
                                </View>
                                { (this.state.episodes.length>0) ?
                                <FlatList
                                    data={this.state.episodes}
                                    renderItem={({item}) => (
                                        <View style={styles.itemWrap}>
                                            <Image style={styles.itemImage} source={{uri:`${env.baseUrl}/${item.image}`}} />
                                            <TouchableOpacity onPress={this.onEditEpisode.bind(this, item.id)} style={styles.itemTextWrap}>
                                                <View style={styles.itemTextContent}>
                                                        <Text>
                                                            {item.title}
                                                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item)=>item.id.toString()}
                                />
                                : <View><Text>No Episode Uploaded!</Text></View>}
                            </Body>
                        </CardItem>
                </Content>
                <Button full style={styles.buttonAddImage} onPress={this.onAddEpisode}>
                    <Text>Add Episode</Text>
                </Button>
                <Button full danger onPress={this.onDelete}>
                    <Text>Delete</Text>
                </Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    labelEpisode: {marginTop: 20, marginBottom: 20},
    itemWrap: {flex: 1, flexDirection:'row', marginBottom: 15},
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    itemTextContent: {flex:1, justifyContent:"center"},
    buttonAddImage: {backgroundColor: '#2980b9'},
    headerRightButtonIcon: {color:'#3498db'}
});

export default EditToonScreen;