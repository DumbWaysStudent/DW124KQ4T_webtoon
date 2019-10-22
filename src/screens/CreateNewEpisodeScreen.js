import React from "react";
import { View, Text, Button, Container, Content, CardItem, Body, Item, Icon, Input, Header, Left, Right, Title } from "native-base"
import { FlatList, Image, Dimensions, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux";
import Toon from "../services/Toon";


const {width, height} = Dimensions.get('window');
const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


class CreateNewEpisodeScreen extends React.Component {

    constructor(props){
        super(props);

        

        this.state = {
            inputName: "",
            images: [],
            isChanged: false,
            isReady: false,
            errors: [],
            countMount: 0,
            id: null,
            toonId: null
        }
    }

    componentDidMount(){
        this.setState({
            toonId: this.props.navigation.getParam("toonId")
        })
        this.props.resetToonTemp();
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

    onBackSubmit = () => {
        if(this.state.isReady){
            console.log("---------------------")
            console.log("clicked");
            console.log(this.props.navigation.getParam("isNew"));
            let data = {
                title: this.state.inputName,
                "images[]": [],
                toonId: this.state.toonId
            }
            for(let i=0;i<this.state.images.length; i++){
                data["images[]"].push(this.state.images[i].img);
            }
            this.props.createEpisode(this.props.auth.data.token, data, this.state.toonId);
            this.props.navigation.goBack();
        }
    }

   

    render(){
        return (
            <Container  style={{paddingTop: 25}}>
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
                        onPress={this.onBackSubmit}>
                            <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
                        </Button>
                    </Right>
                </Header>
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

const mapStateToProps = (state)=>{
    return {
    mytoon: state.mytoon,
    toon: state.toon,
    auth: state.auth
}}

const mapDispatchToProps = {
    createEpisode: Toon.createEpisode,
    resetToonTemp: Toon.resetToonTemp
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewEpisodeScreen);