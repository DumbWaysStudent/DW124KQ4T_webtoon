import React from "react";
import { View, Text, CardItem, Container, Content, Item, Body, Input, Button, Icon, Header, Left, Right, Title } from "native-base";
import { FlatList, Image, StyleSheet } from "react-native";


import { connect } from "react-redux";
import { saveNewToon, saveToon, saveNewEpisode } from "../_actions/mytoon"
import env from '../utils/Env';
import Toon from "../services/Toon";


class CreateNewScreen extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            id: null,
            image: "",
            title: "",
            episodes: [],
            isReady: false,
            errors: [],
        }
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



    onAddEpisode = () => {
        if(this.state.title === ""){
            alert("Title is required");
        }
        else{
            if(this.state.id===null){

                let save = {
                    title: this.state.title,
                    image: this.state.image,
                    isDraft: true,
                };
                this.props.createToon(this.props.auth.data.token, save);

            }
            else{
                this.props.navigation.navigate("CreateNewEpisode", {isNew: true, toonId: this.state.id});
            }
        }
    }

    onAddEpisodeNext = ()=>{
        this.state.id = this.props.mytoon.tempToon.id;
        this.props.navigation.navigate("CreateNewEpisode", {isNew: true, toonId: this.state.id});
    }

    onSubmit = () => {
        if(this.state.isReady){
            if(this.state.id!==null){
                let save = {
                    id: this.state.id,
                    title: this.state.title,
                    image: ((typeof this.state.episodes[0] !== "undefined")?this.state.episodes[0].image:this.state.image),
                    isDraft: 0,
                };
                this.props.updateToon(this.props.auth.data.token, save, this.state.id );
                this.props.navigation.navigate("MyCreation");
            }
            else{
                let save = {
                    title: this.state.title,
                    image: this.state.image,
                    isDraft: 0,
                };
                this.props.createToon(this.props.auth.data.token, save);
            }
        }
    }

    addEpisodeToState = () =>{
        let episodes = this.state.episodes;
        episodes.push(this.props.mytoon.createEpisodeSuccess);
        this.props.resetEpisode();
        this.setState({
            episodes: [...episodes]
        });
    }


    render(){
        return (
            <Container style={{paddingTop: 25}}>
                <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color: "#3498db"}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:"#000"}}>Create Toon</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress={this.onSubmit}>
                            <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
                        </Button>
                    </Right>
                </Header>
                {(this.props.mytoon.isCreateToonLoading===false && this.props.mytoon.tempToon !== null && this.state.id === null )?<>
                    {this.onAddEpisodeNext()}
                </>:<></>}
                {(this.props.mytoon.createEpisodeSuccess!==null)?<>{this.addEpisodeToState()}</>:<></>}
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


const mapStateToProps = (state)=>{
    return {
    mytoon: state.mytoon,
    toon: state.toon,
    auth: state.auth
}}

const mapDispatchToProps = {
    updateToon: Toon.update,
    createToon: Toon.create,
    resetEpisode: Toon.resetCreateEpisode
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewScreen);