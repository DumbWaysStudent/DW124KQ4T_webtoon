import React from "react";
import { View, Text, Container, Content, CardItem, Body, Item, Button, Icon, Input } from "native-base";
import { FlatList, Image, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';


import Auth from '../services/Auth';
import env from '../../env';


const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  
class EditEpisodeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                    if(navigation.getParam("isReady")){
                        var submiting = navigation.state.params;
                        submiting.name = submiting.inputName;
                        delete submiting.inputName;
                        delete submiting.isReady;
                        delete submiting.isChanged;
                        delete submiting.errors;
                        delete submiting.countMount;
                        // submiting.cover = submiting.images[0].src;
                        submiting.edit.edit = submiting.edit;
                        delete submiting.edit;
                        navigation.navigate("EditToon", {editEpisode: submiting, newEpisode: undefined, onDelete: undefined});
                    }
              }}>
                  <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
            </Button>
          )
        };
    }

    constructor(props){
        super(props);

        var edit = this.props.navigation.getParam('edit');

        this.state = {
            inputName: (edit)?edit.title:"",
            images: [],
            isChanged: true,
            isReady: true,
            errors: [],
            countMount: 0,
            id: (edit)?edit.id:null,
            token:""
        }
    }
    

    async componentDidMount(){
        var token = await (new Auth).fetch('token');
        this.setState({token});
        this.onImages();
        if(this.state.isChanged){

            this.props.navigation.setParams({
                ...this.state
            })

            this.setState({
                isChanged: false
            });
        }
    }

    componentDidUpdate(){
        if(this.state.isChanged){
            this.props.navigation.setParams({
                ...this.state
            })
            
            this.setState({
                isChanged: false
            });
        }
    }

    onImages = async () => {
        await axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `${env.apiUrl}/toon-episode/${this.state.id}`
        }).then(result => {
            var episode = result.data.data.data;
            this.setState({
                images: [...episode.images]
            });
        }).catch(error=>{
            console.log(error.response);
        });
    }

    onChangeName = (text) => {
        var error = [];
        if(text === ""){
            error.push("Name is required!");
        }
        

        var allError = this.state.errors.filter((item)=> item.input !== "name");

        var obj ={
            input: "name",
            errors: error
        }
        if(error.length > 0){
            allError.push(obj);
        }

        this.checkError({errors: allError, inputName: text});
    }

    onAddImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              var img = {
                uri: response.uri,
                type: response.type,
                name: response.fileName
              };
              var formdata = new FormData;
              formdata.append("image",img);
              axios({
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        "authorization": `Bearer ${this.state.token}`
                    },
                    data: formdata,          
                    url: `${env.apiUrl}/toon-episode/${this.state.id}/upload-image`
                }).then(result=>{
                    var images = this.state.images;
                    images.push(result.data.data.data);
                    this.setState({
                        images:images
                    });
                    this.checkError();
                });

              
              
            }
        });
    }


    checkError = (json=null) => {
        
        var allError = this.state.errors
        if(json!==null){
            allError = json.errors;
        }

        var isReady = false

        if(allError.length === 0 && this.state.images.length > 0 ){
            isReady= true;
        }

        var state = {...json, isReady: isReady, isChanged: true}
        this.setState(state);
    }

    onDeleteImage = (id) => {
        axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "authorization": `Bearer ${this.state.token}`
            },        
            url: `${env.apiUrl}/toon-episode/delete-image/${id}`
        }).then(result=>{
            var images = this.state.images.filter((item)=>item.id!==id);
            this.setState({
                images:images
            });
        });
        
    }

    onDeleteEps = ()=>{
        this.props.navigation.navigate("EditToon", {onDelete:this.state.id, editEpisode: undefined, newEpisode: undefined})
    }

    render(){
        return (
            <Container>
                <Content>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.state.inputName} onChangeText={this.onChangeName} placeholder="Name" />
                                </Item>
                                <View style={styles.imageLabel}>
                                    <Text>Images</Text>
                                </View>
                                {(this.state.images.length > 0) ? 
                                <FlatList
                                    data={this.state.images}
                                    renderItem={({item}) => (
                                        
                                        <View style={styles.itemWrap}>
                                            <Image style={styles.itemImage} source={{uri: `${env.baseUrl}/${item.url}`}} />
                                            <View style={styles.itemTextWrap}>
                                                <View style={styles.itemTextContent}>
                                                    <Button rounded small onPress={this.onDeleteImage.bind(this, item.id)} danger>
                                                        <Text>
                                                            Delete
                                                        </Text>
                                                    </Button>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    keyExtractor={(item)=>item.id.toString()}
                                />
                                : <View><Text>No Image Uploaded!</Text></View>   }
                            </Body>
                        </CardItem>
                </Content>
                <Button full style={styles.buttonAddImage} onPress={this.onAddImage}>
                    <Text>Add Image</Text>
                </Button>
                <Button full danger onPress={this.onDeleteEps}>
                    <Text>Delete</Text>
                </Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    imageLabel: {marginTop: 20, marginBottom: 20},
    itemWrap: {flex: 1, flexDirection:'row', marginBottom: 15},
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    itemTextContent: {flex: 1, justifyContent: "center"},
    buttonAddImage: {backgroundColor: '#2980b9'},
    headerRightButtonIcon: {color:'#3498db'}
});

export default EditEpisodeScreen;