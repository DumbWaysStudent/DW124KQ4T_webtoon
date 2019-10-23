import React from "react";
import { View, Container, Content, CardItem, Icon, Input, Item, Button, Header, Body, Left, Right, Title } from "native-base";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import ImagePicker from 'react-native-image-picker';


import Auth from "../services/Auth";
import env from '../utils/Env';


import { connect } from 'react-redux';
import { saveAuth } from '../_actions/auth'


const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

  
class EditProfileScreen extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            inputName: this.props.auth.data.name,
        }
    }
  

    handleURL = (url) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
      }

    handleInputName = (text) => {
        this.setState({
            inputName: text
        });
    }

    handleChangeAvatar = async () => {
        ImagePicker.showImagePicker(options, async (response) => {
          
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
                var data ={
                  avatar: {
                    uri: response.uri  ,
                    type: response.type,
                    name: response.fileName
                  }
                }
                this.props.changePhoto(this.props.auth.data.token, data);
            }
        });
    }

    successChangePhoto = ()=>{
      Auth.update(`${this.props.auth.data.image}`,"image");
      this.props.resetChangePhoto();
    }
    
    render() {
        return (
            <Container style={{paddingTop: 25}}>
                <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color: "#3498db"}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:"#000"}}>Edit Profile</Title>
                    </Body>
                    <Right>
                      <Button transparent
                        onPress={() => this.props.navigation.navigate("Profile") }>
                          <Icon name="check" type="FontAwesome" style={styles.headerRightButtonIcon} />
                      </Button>
                    </Right>
                </Header>
                {(this.props.auth.isChangePhotoLoading===false && this.props.auth.changePhotoSuccess)?<>{this.successChangePhoto()}</>:<></>}
                <Content>
                        <CardItem>
                            <TouchableOpacity onPress={this.handleChangeAvatar} style={styles.button}>
                                <Image style={styles.imagePhoto} source={{uri:(this.props.auth.data.image) ? ((this.handleURL(this.props.auth.data.image))?this.props.auth.data.image:`${env.baseUrl}/${this.props.auth.data.image}`) : ""}} />
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


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = {
  changePhoto: Auth.changePhoto,
  resetChangePhoto: Auth.resetChangePhoto
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);