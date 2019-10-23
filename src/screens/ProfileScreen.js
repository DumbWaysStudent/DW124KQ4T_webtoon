import React from 'react';
import { Container, Content, CardItem, Body, Button, Text, H1, Icon, List, ListItem, View, Header, Right, Title } from 'native-base';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';


import Auth from "../services/Auth";
import env from '../utils/Env';
import Layout from '../layouts/Layout';




class ProfileScreen extends React.Component {

    constructor(props){
        super(props);

        var count = 0;

        this.state = {
          profile: {},
          countMount: count
        }
    }


    handleLogout = async () => {
      try{
        await Auth.destroy();
        this.props.authReset();
        this.props.navigation.navigate("Login");
      }
      catch(error){
        console.log(error);
      }
    }

    handleURL = (url) => {
      return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    }

    logoutSuccess = () => {
      Auth.destroy().then(()=>{
          this.props.navigation.navigate("Login");
        });
    }

    

  render() {
    return (
      <Layout screen={"ProfileScreen"} navigation={this.props.navigation}>
          <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
              <Body>
                  <Title style={{color:"#000"}}>Profile</Title>
              </Body>
              <Right>
                <Button transparent
                  onPress={() => this.props.navigation.navigate("EditProfile") }>
                    <Icon name="pencil" type="FontAwesome" style={styles.headerRightButtonIcon} />
                </Button>
              </Right>
          </Header>
          <Content>
              <CardItem>
                <Body style={styles.imageWrap}>
                    <Image style={styles.imagePhoto} source={{uri: (this.props.auth.data) ? ((this.handleURL(this.props.auth.data.image))?this.props.auth.data.image:`${env.baseUrl}/${this.props.auth.data.image}`) : ""}} />
                    <H1 style={styles.profileName}>{(this.props.auth.data)?this.props.auth.data.name:""}</H1>
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
        </Layout>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  authReset: Auth.resetAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);