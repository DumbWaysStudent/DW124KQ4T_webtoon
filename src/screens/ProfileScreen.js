import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon,View } from 'native-base';

import { Image } from 'react-native';

const profile = {
  image: "https://avatars3.githubusercontent.com/u/18370818?s=460&v=4",
  name: "Yusuf Basori"
}




class ProfileScreen extends React.Component {

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
                <Body style={{ flex: 1,alignItems:'center'}}>
                  <Image style={{width:100, height: 100, borderRadius: 50}} source={{uri: this.state.profile.image}} />
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
    );
  }
};


export default ProfileScreen;