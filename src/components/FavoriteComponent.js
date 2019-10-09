import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';


import {Image, TouchableOpacity} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const sliderWidth = 370;
const itemWidth = 120


class FavoriteComponent extends React.Component {

    constructor(props){
        super(props);
    }

    

  render() {
    return (
      <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.items}
          renderItem={({item, index})=>(
            <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
              <Card>
                  <CardItem>
                      <Body>
                          <Image
                          style={{width: 90, height: 90}}
                          source={{uri: item.image}} />
                          <Text>{ item.title }</Text>
                      </Body>
                  </CardItem>
              </Card>
            </TouchableOpacity>
          )}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
      />
    );
  }
};


export default FavoriteComponent;