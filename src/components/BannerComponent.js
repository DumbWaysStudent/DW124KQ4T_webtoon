import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon, View } from 'native-base';


import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {TapGestureHandler, State} from 'react-native-gesture-handler';

import Carousel from 'react-native-snap-carousel';


import Swiper from 'react-native-swiper';

const sliderWidth = 370;
const itemWidth = 250


class BannerComponent extends React.Component {

    constructor(props){
        super(props);
    }

  render(){
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        {this.props.items.map((item, index)=>(
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
            <Card>
              <CardItem>
                    <Body>
                        <Image
                        style={{width: 200, height: 110}}
                        source={{uri: item.image}} />
                  </Body>
                </CardItem>
            </Card>
          </TouchableOpacity>
    ))}
      </Swiper>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    height: 150
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})


export default BannerComponent;