import React from 'react';

import { Card, CardItem, Body } from 'native-base';


import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

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
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
            <Card>
              <CardItem>
                    <Body>
                        <Image
                        style={{width: (width*(80/100)), height: 110}}
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
  }
})


export default BannerComponent;