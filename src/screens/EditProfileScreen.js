import React from "react";
import { View, Container, Content, CardItem, Icon, Input, Item, Button } from "native-base";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker';


import axios from "../utils/Api";
import Auth from "../services/Auth";
import env from '../utils/Env';


const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

  
class EditProfileScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                  navigation.navigate("Profile", navigation.state.params)
                  }}>
                  <Icon style={styles.headerRightButtonIcon} name="check" type="FontAwesome" />
            </Button>
          )
        };
    }

    constructor(props){
        super(props);

        this.state = {
            profile: {},
            inputName: "",
            avatarSource: {},
            isChangingPhoto: false,
            token: ""
        }
    }

    async componentDidMount(){
        await this.getProfile();
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.isChangingPhoto){
            this.props.navigation.setParams({
                avatar: this.state.avatarSource
            })
            var profileNew = this.state.profile;
            profileNew.image = this.state.avatarSource.uri
            this.setState({
                profile: profileNew,
                isChangingPhoto:false
            });
        }
    }
  
    getProfile = async() =>{
        var img = (await (new Auth).fetch("image"));
        var name = await (new Auth).fetch("name");
        var token = await (new Auth).fetch("token");
        this.setState({
          profile: {
            image: (img) ? ((this.handleURL(img))?img:`${env.baseUrl}/${img}`) : "",
            name: name
          },
          inputName: name,
          avatarSource: {uri: (img) ? ((this.handleURL(img))?img:`${env.baseUrl}/${img}`) : ""},
          token: token
        });
    }

    handleURL = (url) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
      }

    handleInputName = (text) => {
        this.setState({
            inputName: text
        });
    }

    handleChangeAvatar = () => {
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
              var formdata=new FormData();
              formdata.append("avatar", {
                uri: response.uri  ,
                type: response.type,
                name: response.fileName
        
              });
                axios({
                    method: 'POST',
                    headers: { 'content-type': 'multipart/form-data',
                        "authorization": `Bearer ${this.state.token}`
                    },
                    data: formdata,          
                    url: `/auth/change-photo`
                }).then(result=>{
                    var obj = {
                            avatarSource: {uri: `${env.baseUrl}/storage/${result.data.data.data}`},
                            isChangingPhoto: true
                          };
                    (new Auth).update(`storage/${result.data.data.data}`,"image");
                    this.setState({...obj});
                }).catch(err=>{
                    console.log(err.response);
                });
            }
        });
    }
    
    render() {
        return (
            <Container>
                <Content>
                        <CardItem>
                            <TouchableOpacity onPress={this.handleChangeAvatar} style={styles.button}>
                                <Image style={styles.imagePhoto} source={this.state.avatarSource} />
                                <View style={styles.iconWrap}>
                                    <Icon style={styles.buttonIcon} name="camera" type="FontAwesome" />
                                </View>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem>
                            <Item>
                                <Input style={styles.inputName} placeholder="Your Name" value={this.state.inputName} onChangeText={this.handleInputName} />
                            </Item>
                        </CardItem>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  imagePhoto: {width:200, height: 200, borderRadius: 200/2, overflow: "hidden", borderWidth: 3,borderColor: "#3498db"},
  iconWrap: {marginTop: -50, marginLeft: 120, width:50, height:50, borderRadius: 25, backgroundColor: "#3498db",alignItems:"center", justifyContent:"center"},
  buttonIcon: {color:"#fff"},
  button: { flex: 1, alignItems: 'center'},
  inputName: {fontSize: 30, color: "black", textAlign: "center" },
  headerRightButtonIcon: {color:'#3498db'}
});

export default EditProfileScreen;