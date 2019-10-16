import React from 'react';

import { Card, CardItem, Body, Text } from 'native-base';


import {Image, TouchableOpacity} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import env from '../../env';

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
            <>
              {(typeof item.toon === "undefined")?
                <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                  <Card>
                      <CardItem>
                          <Body>
                              <Image
                              style={{width: 90, height: 90}}
                              source={{uri: `${env.baseUrl}/${item.image}`}} />
                              <Text>{ item.title }</Text>
                          </Body>
                      </CardItem>
                  </Card>
                </TouchableOpacity>
              :
              <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                <Card>
                    <CardItem>
                        <Body>
                            <Image
                            style={{width: 90, height: 90}}
                            source={{uri: `${env.baseUrl}/${item.toon.image}`}} />
                            <Text>{ item.toon.title }</Text>
                        </Body>
                    </CardItem>
                </Card>
              </TouchableOpacity>
              }
            </>
            
          )}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
      />
    );
  }
};


export default FavoriteComponent;