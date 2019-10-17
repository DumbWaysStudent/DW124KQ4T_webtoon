import React from 'react';
import { Container, Content, CardItem, Body, Button, Text, H1, Icon, List, ListItem, View } from 'native-base';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';


import Auth from "../services/Auth";
import env from '../utils/Env';




class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        headerRight: (
          <Button transparent
            onPress={() => navigation.navigate("EditProfile") }>
                <Icon name="pencil" type="FontAwesome" style={styles.headerRightButtonIcon} />
            </Button>
        )
      };
  }

    constructor(props){
        super(props);

        var count = 0;

        this.state = {
          profile: {},
          countMount: count
        }
    }

    async componentDidMount(){
      await this.getProfile();
    }

    async componentDidUpdate(){
      if(this.props.navigation.getParam("avatar")!==undefined){
        this.props.navigation.setParams({
          avatar: undefined
        });
        await this.getProfile();
      }
    }

    getProfile = async() =>{
      var img = (await Auth.fetch("image"));
      var obj = {
        image: (img) ? ((this.handleURL(img))?img:`${env.baseUrl}/${img}`) : "",
        name: await Auth.fetch("name")
      };
      this.setState({
        profile: {...obj}
      });
    }

    handleLogout = async () => {
      await Auth.destroy().then(()=>{
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
              <CardItem>
                <Body style={styles.imageWrap}>
                    <Image style={styles.imagePhoto} source={{uri: this.state.profile.image}} />
                    <H1 style={styles.profileName}>{this.state.profile.name}</H1>
                </Body>
              </CardItem>
              <List style={{marginRight: 15}}>
                <ListItem>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("MyCreation")} style={styles.menuItem}>
                        <View style={styles.menuLabel}><Text>My Webtoon Creation</Text></View>
                        <View><Icon name="angle-right" type="FontAwesome"/></View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity onPress={this.handleLogout} style={styles.menuItem}>
                    <View style={styles.menuLabel}>
                      <Text>Logout</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </List>
            
          </Content>
        </Container>
    );
  }
};

const styles = StyleSheet.create({
  imageWrap: { flex: 1, alignItems: 'center'},
  imagePhoto: {width:200, height: 200, borderRadius: 200/2},
  profileName: {marginBottom: 70, marginTop: 30},
  menuItem: {flex: 1,flexDirection:'row', alignItems: 'center'},
  menuLabel: {flex: 1},
  headerRightButtonIcon: {color:'#3498db'}

});

export default ProfileScreen;