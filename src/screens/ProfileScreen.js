import React from 'react';

import { Container, Content, Card, CardItem, Body, Button, Text, H1, Icon, Right, List, ListItem, View } from 'native-base';

import { Image, TouchableOpacity } from 'react-native';

const profile = {
  image: "https://avatars3.githubusercontent.com/u/18370818?s=460&v=4",
  name: "Yusuf Basori"
}




class ProfileScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        headerRight: (
          <Button transparent
            onPress={() => alert('This is a button!')}>
                <Icon name="pencil" type="FontAwesome" />
            </Button>
        )
      };
  }

    constructor(props){
        super(props);

        this.state = {
          profile: profile
        }
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
                  <TouchableOpacity style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}><Text>My Webtoon Creation</Text></View>
                        <View><Icon name="angle-right" type="FontAwesome"/></View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity style={{flex: 1,flexDirection:'row', alignItems: 'center'}}>
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