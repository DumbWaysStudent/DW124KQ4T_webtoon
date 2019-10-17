import React from "react";
import { View, Text, Button, Container, Content, CardItem, Body, Item, Icon, Input } from "native-base"
import { FlatList, Image, Dimensions, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');


const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

class CreateNewEpisodeScreen extends React.Component {
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
                        submiting.time = parseInt((new Date).getTime());
                        submiting.cover = submiting.images[0].src;
                        if(typeof navigation.state.params.edit === "undefined"){
                            navigation.navigate("CreateNew", {newEpisode: submiting});
                        }
                        else{
                            delete submiting.edit;
                            navigation.navigate("EditToon", {newEpisode: submiting});
                        }
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
            inputName: "",
            images: [],
            isChanged: false,
            isReady: false,
            errors: [],
            countMount: 0
        }
    }
    

    componentDidMount(){
        if(this.state.countMount === 0){
            this.onChangeName("");
            this.setState({
                countMount: this.state.countMount+1
            });
        }
        
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
              images.push({src:source, id:(new Date).getTime(), height: b*height, width: bWidth, img: {
                uri: response.uri,
                type: response.type,
                name: response.fileName
              }});

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
                                            <Image style={styles.itemImage} source={item.src} />
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
                <Button style={styles.buttonAddImage} full onPress={this.onAddImage}>
                    <Text>Add Image</Text>
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

export default CreateNewEpisodeScreen