import React from 'react';

import { Card, CardItem, Body } from 'native-base';


import {Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import Swiper from 'react-native-swiper';

import env from '../../env'

const {width, height} = Dimensions.get('window');

class BannerComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          items: []
        };
    }

    componentDidMount(){
      var items = [];
      var max = (this.props.items.length>=5)?5:this.props.items.length;
      for(var i=0;i<max;i++){
        items.push(this.props.items[i]);
      }
      this.setState({
        items: [...items]
      });
    }

  render(){
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        {this.state.items.map((item, index)=>(
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                        <Image
                        style={{width: (width*(100/100)), height: 250}}
                        source={{uri: `${env.baseUrl}/${item.image}`}} />
          </TouchableOpacity>
    ))}
      </Swiper>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    height: 250
  }
})


export default BannerComponent;