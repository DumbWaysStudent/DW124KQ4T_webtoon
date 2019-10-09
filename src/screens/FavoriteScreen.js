import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';
import MyFavoriteCompnent from '../components/MyFavoriteComponent';

const banners = [{
  id: 1,
  title: 'The Secret of Angel',
  image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}, {
  id: 2,
  title: 'Pasutri Gaje',
  image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}, {
  id: 3,
  title: 'Young Mom',
  image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
}];


class FavoriteScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          entries: banners
        }
    }

    onDetailTitle = (id) => {
        var item = this.state.entries.filter((item, index)=> item.id === id)[0];
        this.props.navigation.navigate("DetailTitle", item);
    }

    

  render() {
    return (
        <Container>
          <Content>
            <Card>
              <CardItem>
                <Body>
                  <Item>
                      <Input placeholder="Search" />
                      <Button transparent>
                          <Icon type="FontAwesome" name="search" />
                      </Button>
                  </Item>
                  <MyFavoriteCompnent items={this.state.entries} onDetailTitle={this.onDetailTitle} />
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
    );
  }
};


export default FavoriteScreen;