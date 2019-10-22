import React from "react";
import { View, Text, CardItem, Container, Content, Item, Body, Input, Button, Icon, Header, Left, Right, Title } from "native-base";
import { FlatList, Image, StyleSheet } from "react-native";


import { connect } from "react-redux";
import { s, saveNewToon, saveToon, saveNewEpisode } from "../_actions/mytoon"
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
            isNew: false,
            isReady: false,
            errors: [],
            isChanged: true,
            epsCheck:[]
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.mytoon.newEpisode!== null){
            this.onNewEpisode(this.props.mytoon.newEpisode);
        }
    }

    onNewEpisode = async (data) => {
        let temp = this.props.mytoon.tempEpisode;
        if(temp.filter((item)=>item.time===data.time)[0]===undefined){
            let form = {
                "title":data.title,
                "toonId":this.state.id
            }
            form["images[]"] = [];
            for(let i=0;i<data.images.length;i++){
                form["images[]"].push(data.images[i].img);
            }
            try{
                let item = (await Toon.createEpisode(form, 1)).data.data.data;
                let eps = this.state.episodes;
                eps.push(item);
                temp.push(data);
                this.props.dispatch(saveNewEpisode(null));
                this.setState({
                    image: eps[0].image,
                    episodes: [...eps],
                });
                

            }
            catch(err){
                console.log(err);
                console.log(err.response);
            }
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



    onAddEpisode = async () => {
        if(this.state.title === ""){
            alert("Title is required");
        }
        else{
            if(this.state.id===null){
                try{

                    var data = {
                        title: this.state.title,
                        image: "",
                        isDraft: 1
                    };
                    let item = (await Toon.create(data)).data.data.data;

                    this.setState({
                        id: item.id
                    });
                    let toons = this.props.mytoon.toons;
                    toons.unshift(item);
                    this.props.dispatch(saveToon(toons))
                }
                catch(err){
                    console.log(err);
                }
            }
            this.props.navigation.navigate("CreateNewEpisode", {isNew: true});
        }
    }

    onSubmit = async () => {
        if(this.state.isReady){
            if(this.state.id!==null){
                this.props.dispatch(saveNewToon({
                    id: this.state.id,
                    title: this.state.title,
                    image: this.state.image,
                    episodes: this.state.episodes,
                    isDraft: 0,
                    time: (new Date).getTime()
                }));
                this.props.navigation.navigate("MyCreation", {isEdit:true});
            }
            else{
                this.props.dispatch(saveNewToon({
                    title: this.state.title,
                    image: "",
                    time: (new Date).getTime()
                }));
                this.props.navigation.navigate("MyCreation");
            }
        }
    }


    render(){
        return (
            <Container>
                <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color: "#3498db"}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:"#000"}}>Create Episode</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress={this.onSubmit}>
                            <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
                        </Button>
                    </Right>
                </Header>
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
    mytoon: state.mytoon
}}

export default connect(mapStateToProps)(CreateNewScreen);