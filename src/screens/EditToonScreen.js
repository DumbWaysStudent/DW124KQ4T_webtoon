import React from "react";
import { View, Text, Container, Content, CardItem, Body, Button, Item, Input, Icon, Header, Title, Right, Left } from "native-base";
import { FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { saveNewToon, saveToon, saveNewEpisode } from "../_actions/mytoon"

import { connect } from "react-redux";
import env from '../utils/Env';
import Toon from '../services/Toon';


class EditToonScreen extends React.Component{

    constructor(props){
        super(props)
        this.state={
            id: null,
            image: null,
            title: "",
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

        await Toon.deleteEpisode(1,id).then(result=>{
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
        }, 1 , data.id).then(result=>{
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
            "toonId": this.props.toon.detailToon.id
        }
        for(var i=0;i<data.images.length;i++){
            form["images[]"] = data.images[i].img;
        }
        await Toon.createEpisode(form, 1).then(result=>{
            var item = result.data.data.data;
            var eps = (this.state.episodes.length>0)?this.state.episodes:this.props.toon.episodeDetail;
            var epsCheck = this.state.epsCheck;
            epsCheck.push(data);
            eps.push(item);

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

    onDetail = (id)=> {
        this.setState({ id });
        this.props.fetchDetailToon(id);

        this.props.fetchEpisodeToon(id);
    }

    onAddEpisode = () => {
        this.props.navigation.navigate("CreateNewEpisode", {toonId: this.state.id});
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
        this.props.deleteToon(this.props.auth.data.token, this.props.toon.detailToon.id);
        this.props.navigation.goBack();
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

        var state = {...json, isReady: isReady}
        this.setState(state);
    }

    onEditEpisode = (id) => {
        let episodes = (this.state.episodes.length>0)?this.state.episodes:this.props.toon.episodeToon;
        var item = episodes.filter((item)=>item.id===id)[0];
        this.props.navigation.navigate("EditEpisode", {edit: item});
    }

    onSubmit = () => {
        if(this.state.isReady){
            let image = this.state.image;
            if(image==null || image == ""){
                image = this.props.toon.detailToon.image
            }
            if((image==null || image == "" ) && typeof this.state.episodes[0]!=="undefined"){
                image = this.state.episodes[0].image
            }
            if((image==null || image == "" ) && typeof this.props.toon.episodeToon[0]!=="undefined"){
                image = this.props.toon.episodeToon[0].image
            }

            let title = ((this.state.title=="")?((this.props.toon.detailToon!==null)?this.props.toon.detailToon.title:""):this.state.title);
            let id = this.props.toon.detailToon.id;

            let save = {
                id: id,
                title: title,
                image: image,
                isDraft: 0,
            };

            this.props.updateToon(this.props.auth.data.token,save, id);
            this.props.navigation.navigate('MyCreation');
            
        }
    }
    addEpisodeToState = () =>{
        let episodes = (this.state.episodes.length>0)?this.state.episodes:this.props.toon.episodeToon;
        episodes.push(this.props.mytoon.createEpisodeSuccess);
        this.props.resetEpisode();
        this.setState({
            episodes: [...episodes]
        });
    }
    updateEpisodeState = () => {
        let episodes = (this.state.episodes.length>0)?this.state.episodes:this.props.toon.episodeToon;
        let updatedData = this.props.mytoon.updateEpisodeSuccess;
        let index = episodes.findIndex(item => item.id === updatedData.id);
        episodes[index]=updatedData;
        this.props.resetEpisode();
        this.setState({
            episodes: [...episodes]
        });
    }
    deleteEpisodeState = () => {
        let episodes = (this.state.episodes.length>0)?this.state.episodes:this.props.toon.episodeToon;
        episodes = episodes.filter((item)=>item.id!==this.props.mytoon.deleteEpisodeSuccess);
        this.props.resetDeleteEpisodeSuccess();
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
                        <Title style={{color:"#000"}}>Edit Webtoon</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress={this.onSubmit}>
                            <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
                        </Button>
                    </Right>
                </Header>
                {(this.props.mytoon.createEpisodeSuccess!==null)?<>{this.addEpisodeToState()}</>:<></>}
                {(this.props.mytoon.updateEpisodeSuccess!==null)?<>{this.updateEpisodeState()}</>:<></>}
                {(this.props.mytoon.deleteEpisodeSuccess!==null)?<>{this.deleteEpisodeState()}</>:<></>}
                <Content>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={(this.state.title=="")?((this.props.toon.detailToon!==null)?this.props.toon.detailToon.title:""):this.state.title} onChangeText={this.onChangeTitle} placeholder="Title" />
                                </Item>
                                <View  style={styles.labelEpisode}>
                                    <Text>Episode</Text>
                                </View>
                                { (this.props.toon.episodeToon.length>0) ?
                                <FlatList
                                    data={(this.state.episodes.length>0)?this.state.episodes:this.props.toon.episodeToon}
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
                {
                    (this.props.toon.isDetailToonLoading)?
                    <Button disabled full>
                        <Text>Add Episode</Text>
                    </Button>
                    :
                    <Button full style={styles.buttonAddImage} onPress={this.onAddEpisode}>
                        <Text>Add Episode</Text>
                    </Button>
                }

                {
                    (this.props.toon.isDetailToonLoading)?
                    <Button disabled full>
                        <Text>Delete</Text>
                    </Button>
                    :
                    <Button full danger onPress={this.onDelete}>
                        <Text>Delete</Text>
                    </Button>
                }
                
                
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
    fetchDetailToon: Toon.detail,
    fetchEpisodeToon: Toon.episodeList,
    updateToon: Toon.update,
    deleteToon: Toon.delete,
    resetEpisode: Toon.resetCreateEpisode,
    resetDeleteEpisodeSuccess: Toon.resetDeleteEpisodeSuccess
}


export default connect(mapStateToProps, mapDispatchToProps)(EditToonScreen);