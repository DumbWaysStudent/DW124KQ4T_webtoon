import React from 'react';

import { Card, CardItem, Body } from 'native-base';


import {Image, StyleSheet, Dimensions} from 'react-native';

import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

class BannerComponent extends React.Component {

    constructor(props){
        super(props);
    }
    
  render(){
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        {this.props.items.map((item, index)=>(
          <Card key={item.id}>
            <CardItem>
                  <Body>
                      <Image
                      style={{width: (width*(80/100)), height: 110}}
                      source={{uri: item.image}} />
                </Body>
              </CardItem>
          </Card>
    ))}
      </Swiper>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    height: 150
  }
})


export default BannerComponent;