import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon, ListItem, View, List } from 'native-base';
import {Image} from "react-native"


class BannerComponent extends React.Component {

    constructor(props){
        super(props);
    }

    

  render() {
    return (
        <View>
        {this.props.items.map((item, index) => {
            return <ListItem key={item.id.toString()}>
                <Image style={{width: 50, height: 50}} source={{uri: item.image}} />
                <View style={{marginLeft: 30}}>
                    <Text>{item.title}</Text>
                    <Button iconLeft small>
                        <Icon type="FontAwesome" name="plus" />
                        <Text>Favorite</Text>
                    </Button>
                </View>
            </ListItem>
        })}
        </View>
    );
  }
};


export default BannerComponent;