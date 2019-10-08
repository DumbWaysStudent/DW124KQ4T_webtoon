import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';


import {Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const sliderWidth = 370;
const itemWidth = 250


class BannerComponent extends React.Component {

    constructor(props){
        super(props);
    }

    

  render() {
    return (
      <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.items}
          renderItem={({item, index})=>(
              <Card>
                  <CardItem>
                      <Body>
                          <Image
                          style={{width: 200, height: 110}}
                          source={{uri: item.image}} />
                      </Body>
                  </CardItem>
              </Card>
          )}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
      />
    );
  }
};


export default BannerComponent;