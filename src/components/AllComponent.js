import React from 'react';

import { Body, Button, Text, Icon, ListItem, View } from 'native-base';
import {Image, TouchableOpacity} from "react-native"


class BannerComponent extends React.Component {

    constructor(props){
        super(props);
    }

    

  render() {
    return (
        <View>
        {this.props.items.map((item, index) => {
            return <ListItem key={item.id.toString()}>
                <TouchableOpacity key={item.id}>
                    <Image style={{width: 50, height: 50}} source={{uri: item.image}} />
                </TouchableOpacity>
                <View style={{marginLeft: 30}}>
                    <Body>
                    <TouchableOpacity key={item.id}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                    <Button iconLeft small>
                        <Icon type="FontAwesome" name="plus" />
                        <Text>Favorite</Text>
                    </Button>
                    </Body>
                </View>
            </ListItem>
        })}
        </View>
    );
  }
};


export default BannerComponent;