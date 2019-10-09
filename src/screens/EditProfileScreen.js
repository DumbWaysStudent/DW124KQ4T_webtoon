import React from "react";
import { View, Text, Container, Content, Card, CardItem, Body, Icon, Input, Item, Button } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-picker';

const profile = {
    image: "https://avatars3.githubusercontent.com/u/18370818?s=460&v=4",
    name: "Yusuf Basori"
  }

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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
              onPress={() => navigation.navigate("Profile")}>
                  <Icon name="check" type="FontAwesome" />
            </Button>
          )
        };
    }

    constructor(props){
        super(props);

        this.state = {
            profile: profile,
            inputName: profile.name,
            avatarSource: profile.image
        }
    }

    handleInputName = (text) => {
        this.setState({
            inputName: text
        });
    }

    handleChangeAvatar = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
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
          
              this.setState({
                avatarSource: source,
              });
            }
        });
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <TouchableOpacity onPress={this.handleChangeAvatar} style={{ flex: 1, alignItems: 'center'}}>
                                <Image style={{width:200, height: 200, borderRadius: 200/2, overflow: "hidden", borderWidth: 3,borderColor: "black"}} source={{uri: this.state.avatarSource}} />
                                <View style={{marginTop: -30, marginLeft: 120}}>
                                    <Icon name="camera" type="FontAwesome" />
                                </View>
                            </TouchableOpacity>
                        </CardItem>
                        <CardItem>
                            <Item>
                                <Input style={{fontSize: 30, color: "black", textAlign: "center" }} placeholder="Your Name" value={this.state.inputName} onChangeText={this.handleInputName} />
                            </Item>
                        </CardItem>
                    </Card> 
                </Content>
            </Container>
        );
    }
}

export default EditProfileScreen;