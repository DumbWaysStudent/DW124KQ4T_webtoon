import React from 'react';

import { Container, Content, Card, CardItem, Body, Button, Text, H1, Icon, List, ListItem, View } from 'native-base';

import { Image, TouchableOpacity } from 'react-native';

import Auth from "../services/Auth";
import env from "../../env";

const profile = {
  image: "https://avatars3.githubusercontent.com/u/18370818?s=460&v=4",
  name: "Yusuf Basori"
}




class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        headerRight: (
          <Button transparent
            onPress={() => navigation.navigate("EditProfile") }>
                <Icon name="pencil" type="FontAwesome" />
            </Button>
        )
      };
  }

    constructor(props){
        super(props);

        this.state = {
          profile: {}
        }
    }

    async componentDidMount(){
      await this.getProfile();
    }

    getProfile = async() =>{
      var img = (await (new Auth).fetch("image"));
      this.setState({
        profile: {
          image: (img) ? ((this.handleURL(img))?img:`${env.baseUrl}/${img}`) : "",
          name: await (new Auth).fetch("name")
        }
      });
    }

    handleLogout = async () => {
      await (new Auth).destroy().then(()=>{
        this.props.navigation.navigate("Login");
      }) 
    }

    handleURL = (url) => {
      return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    }

    

  render() {
    return (
        <Container>
          <Content>
            <Card>
              <CardItem>
                <Body style={{ flex: 1, alignItems: 'center'}}>
                    <Image style={{width:200, height: 200, borderRadius: 200/2}} source={{uri: this.state.profile.image}} />
                    <H1 style={{marginBottom: 70, marginTop: 30}}>{this.state.profile.name}</H1>
                </Body>
              </CardItem>
              <List>
                <ListItem>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("MyCreation")} style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}><Text>My Webtoon Creation</Text></View>
                        <View><Icon name="angle-right" type="FontAwesome"/></View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity onPress={this.handleLogout} style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
                    <View style={{flex: 1}}>
                      <Text>Logout</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </List>
            </Card>
          </Content>
        </Container>
    );
  }
};


export default ProfileScreen;