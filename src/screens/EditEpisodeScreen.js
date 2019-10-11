import React from "react";
import { View, Text, Container, Content, Card, CardItem, Body, Item, Button, Icon, ListItem, Input } from "native-base";
import { FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
                        submiting.cover = submiting.images[0].src;
                        submiting.edit.edit = submiting.edit;
                        delete submiting.edit;
                        navigation.navigate("EditToon", {editEpisode: submiting, newEpisode: undefined, onDelete: undefined});
                    }
              }}>
                  <Icon name="check" type="FontAwesome" />
            </Button>
          )
        };
    }

    constructor(props){
        super(props);

        

        this.state = {
            inputName: this.props.navigation.getParam('edit').name,
            images: this.props.navigation.getParam('edit').images,
            isChanged: true,
            isReady: true,
            errors: [],
            countMount: 0,
            time: this.props.navigation.getParam('edit').time
        }
    }
    

    componentDidMount(){
        
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

            var images = this.state.images;
          
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
              var bWidth =(width*(20/100));
              var b = (width*(20/100))/response.width;
              images.push({src:source, id:(new Date).getTime(), height: b*height, width: bWidth});

              this.setState({
                  images:images
              });
              this.checkError();
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
        var images = this.state.images.filter((item)=>item.id!==id);
        this.setState({
            images:images
        });
    }

    onDeleteEps = ()=>{
        this.props.navigation.navigate("EditToon", {onDelete:this.state.time, editEpisode: undefined, newEpisode: undefined})
    }

    render(){
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.state.inputName} onChangeText={this.onChangeName} placeholder="Name" />
                                </Item>
                                <Item>
                                    <Text>Images</Text>
                                </Item>
                                <FlatList
                                    data={this.state.images}
                                    renderItem={({item}) => (
                                        
                                        <ListItem>
                                            <Image style={{width: 50, height: 50}} source={item.src} />
                                            <View style={{marginLeft: 20}}>
                                                <Button onPress={this.onDeleteImage.bind(this, item.id)} danger>
                                                    <Text>
                                                        Delete
                                                    </Text>
                                                </Button>
                                            </View>
                                        </ListItem>
                                    )}
                                    keyExtractor={(item)=>item.id.toString()}
                                />
                                <Button block light onPress={this.onAddImage}>
                                    <Text>Add Image</Text>
                                </Button>
                                <Button block danger onPress={this.onDeleteEps}>
                                    <Text>Delete</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

export default EditEpisodeScreen;