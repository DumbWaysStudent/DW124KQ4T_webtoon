import React from "react";
import { View, Text, Container, Content, CardItem, Body, Item, Button, Icon, Input, Header, Title, Left, Right } from "native-base";
import { FlatList, Image, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';

import Toon from '../services/Toon';
import env from '../utils/Env';
import RBSheet from "react-native-raw-bottom-sheet";


const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  
class EditEpisodeScreen extends React.Component {

    constructor(props){
        super(props);

        var edit = this.props.navigation.getParam('edit');

        this.state = {
            inputName: (edit)?edit.title:"",
            isChanged: true,
            isReady: true,
            errors: [],
            id: (edit)?edit.id:null,
            deleteImageId:null
        }
    }
    

    componentDidMount(){
        this.props.fetchImageEpisode(1, this.state.id);
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
              
              var form = {
                  image: {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                  }
              }
              this.props.uploadImageEpisode(this.props.auth.data.token,form, 1, this.state.id);
              
            }
        });
    }


    checkError = (json=null) => {
        
        var allError = this.state.errors
        if(json!==null){
            allError = json.errors;
        }

        var isReady = false

        if(allError.length === 0 && this.props.toon.imageEpisode.images.length > 0 ){
            isReady= true;
        }

        var state = {...json, isReady: isReady, isChanged: true}
        this.setState(state);
    }

    onDeleteImage = (id) => {
        this.setState({
            deleteImageId: id
        });
        this[RBSheet+1].open();
    }

    onDeleteImageConfirm = () => {
        this.props.deleteEpisodeImage(this.props.auth.data.token, 1, this.state.deleteImageId);
        this[RBSheet+1].close();
    }

    onDeleteEps = ()=>{
        this.RBSheet.close();
        this.props.deleteEpisode(this.props.auth.data.token, 1, this.state.id);
        this.props.navigation.goBack();
    }

    successUploadImage = () => {
        this.props.addImageToEpisode(this.props.mytoon.uploadImageSuccess)
    }

    onSubmit = () => {
        if(this.state.isReady){
            this.props.updateEpisode(this.props.auth.data.token, {title:this.state.inputName}, 1, this.state.id);
            this.props.navigation.goBack();
        }
    }

    successDeleteImage = () => {
        this.props.deleteImageFromEpisode(this.props.mytoon.deleteEpisodeImageSuccess);
    }

    onConfirmDeleteEps = () => {
        this.RBSheet.open();
    }

    onCancelDeleteEps = () => {
        this.RBSheet.close();
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
                        <Title style={{color:"#000"}}>Edit Episode</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onSubmit}>
                                <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
                        </Button>
                    </Right>
                </Header>
                
                {(this.props.toon.imageEpisode && this.state.isChanged===false)?
                    <>{this.checkError()}</>
                    :
                    <></>
                }
                {(this.props.mytoon.isUploadImageLoading===false && this.props.mytoon.uploadImageSuccess)?
                <>{this.successUploadImage()}</>
                :
                <></>
                }
                {(this.props.mytoon.isDeleteEpisodeImageLoading===false && this.props.mytoon.deleteEpisodeImageSuccess)?<>{this.successDeleteImage()}</>:<></>}
                <Content>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.state.inputName} onChangeText={this.onChangeName} placeholder="Name" />
                                </Item>
                                <View style={styles.imageLabel}>
                                    <Text>Images</Text>
                                </View>
                                {(!this.props.toon.isImageEpisodeLoading) ? 
                                <FlatList
                                    data={(this.props.toon.imageEpisode)?this.props.toon.imageEpisode.images:[]}
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
                <Button full danger onPress={this.onConfirmDeleteEps}>
                    <Text>Delete</Text>
                </Button>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={130}
                    duration={250}
                    >
                        <View style={{padding: 10}}>

                            <View>
                                <Text>Are You Sure?</Text>
                            </View>
                            <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                <Button onPress={this.onCancelDeleteEps} danger style={{flex:1, justifyContent: "center"}}>
                                    <Text>Cancel</Text>
                                </Button>
                                <Button onPress={this.onDeleteEps} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                    <Text>Yes, I'm Sure!</Text>
                                </Button>
                            </View>
                        </View>
                </RBSheet>
                <RBSheet
                    ref={ref => {
                        this[RBSheet+1] = ref;
                    }}
                    height={130}
                    duration={250}
                    >
                        <View style={{padding: 10}}>

                            <View>
                                <Text>Are You Sure?</Text>
                            </View>
                            <View style={{flex:1, flexDirection:"row",marginTop:20}}>
                                <Button onPress={()=>this[RBSheet+1].close()} danger style={{flex:1, justifyContent: "center"}}>
                                    <Text>Cancel</Text>
                                </Button>
                                <Button onPress={this.onDeleteImageConfirm} style={{flex:1, justifyContent: "center", backgroundColor:"#2980b9"}}>
                                    <Text>Yes, I'm Sure!</Text>
                                </Button>
                            </View>
                        </View>
                </RBSheet>
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

const mapStateToProps = (state)=>{
    return {
    mytoon: state.mytoon,
    toon: state.toon,
    auth: state.auth
}}

const mapDispatchToProps = {
    fetchImageEpisode: Toon.episodeDetail,
    uploadImageEpisode: Toon.uploadEpisodeImage,
    addImageToEpisode: Toon.addImageToEpisode,
    updateEpisode: Toon.updateEpisode,
    deleteEpisode: Toon.deleteEpisode,
    deleteEpisodeImage: Toon.deleteEpisodeImage,
    deleteImageFromEpisode: Toon.deleteImageFromEpisode
}


export default connect(mapStateToProps, mapDispatchToProps)(EditEpisodeScreen);