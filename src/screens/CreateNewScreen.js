import React from "react";
import { View, Text, CardItem, Container, Content, Item, Body, Input, Button, Icon } from "native-base";
import { FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import env from "../../env";
import Auth from "../services/Auth";

class CreateNewScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                if(navigation.getParam("isReady")){
                    var submiting = navigation.state.params;
                    if(submiting.id != null){
                        submiting.isNew = false;
                        submiting.onEdit = submiting.id ;
                        submiting.isDraft = 0 ;
                    }
                    else{
                        submiting.isNew = true;
                    }
                    delete submiting.isReady;
                    delete submiting.isChanged;
                    delete submiting.errors;
                    submiting.time = parseInt((new Date).getTime());
                    navigation.navigate("MyCreation", submiting);
                }
              }}>
                  <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
            </Button>
          )

        };
    }

    constructor(props){
        super(props);


        this.state = {
            id: null,
            image: "",
            title: "",
            episodes: [],
            isNew: false,
            isReady: false,
            errors: [],
            isChanged: true,
            token: "",
            epsCheck:[]
        }
    }

    async componentDidMount(){

        var token = await (new Auth).fetch('token');
        this.setState({
            token: token
        })
        if(this.state.isChanged){

            this.props.navigation.setParams({
                ...this.state
            })
            
            this.setState({
                isChanged: false
            });
        }
    }

    async componentDidUpdate(prevProps, prevState){
        if(this.state.isChanged){

            this.props.navigation.setParams({
                ...this.state
            })
            
            this.setState({
                isChanged: false
            });
        }
        if(typeof this.props.navigation.getParam('newEpisode') !== "undefined" && this.state.epsCheck.filter((item)=>item.time===this.props.navigation.getParam('newEpisode').time).length===0){
            if(this.state.episodes === prevState.episodes){
                await this.onNewEpisode(this.props.navigation.getParam('newEpisode'));
            }   
            
        }
    }

    onNewEpisode = async (data) => {
        this.props.navigation.setParams({...{
            newEpisode: undefined
        }});
        var formdata = new FormData;
        formdata.append("title", data.name);
        formdata.append("toonId", this.state.id);
        for(var i=0;i<data.images.length;i++){
            formdata.append("images[]", data.images[i].img);
        }
        await axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },
            data: formdata,          
            url: `${env.apiUrl}/toon-episode/create`
        }).then(result=>{
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
            
        }).catch();
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


    checkError = (json=null) => {
        var allError = this.state.errors
        if(json!==null){
            allError = json.errors;
        }

        var isReady = true

        if(allError.length > 0){
            isReady= false;
        }

        var state = {...json, isReady: isReady, isChanged: true}
        this.setState(state);


    }



    onAddEpisode = async () => {
        if(this.state.title === ""){
            alert("Title is required");
        }
        else{
            if(this.state.id===null){
                await axios({
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        "authorization": `Bearer ${this.state.token}`
                    },
                    data: {
                        title: this.state.title,
                        image: "",
                        isDraft: 1
                    },          
                    url: `${env.apiUrl}/toon/create`
                }).then(result=>{
                    this.setState({
                        id: result.data.data.data.id
                    });
                    this.props.navigation.setParams({
                        id: result.data.data.data.id
                    });
                }).catch();
            }
            this.props.navigation.navigate("CreateNewEpisode");
        }
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
                                <View style={styles.labelEpisode}>
                                    <Text>Episode</Text>
                                </View>
                                {(this.state.episodes.length > 0) ? 
                                <FlatList
                                    data={this.state.episodes}
                                    renderItem={({item}) => (
                                        <View style={styles.itemWrap}>
                                            <Image style={styles.itemImage} source={{uri: `${env.baseUrl}/${item.image}`}} />
                                            <View style={styles.itemTextWrap}>
                                                <View style={styles.itemTextContent}>
                                                    <Text>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </View>
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

export default CreateNewScreen;