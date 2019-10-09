import React from 'react';

import { Item, Button, Text, Icon, ListItem, View } from 'native-base';
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
                <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                    <Image style={{width: 50, height: 50}} source={{uri: item.image}} />
                </TouchableOpacity>
                <View style={{marginLeft: 30}}>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                            <Item><Text>{item.title}</Text></Item>
                        </TouchableOpacity>
                        <Item>
                            <Button iconLeft small>
                                <Icon type="FontAwesome" name="plus" />
                                <Text>Favorite</Text>
                            </Button>
                        </Item>
                </View>
            </ListItem>
        })}
        </View>
    );
  }
};


export default BannerComponent;