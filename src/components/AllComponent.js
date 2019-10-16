import React from 'react';

import { Item, Button, Text, Icon, ListItem, View } from 'native-base';
import {Image, TouchableOpacity} from "react-native"
import env from "../../env"


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
                    <Image style={{width: 50, height: 50,borderWidth: 1, borderColor: "#000"}} source={{uri: `${env.baseUrl}/${item.image}`}} />
                </TouchableOpacity>
                <View style={{marginLeft: 30}}>
                        <TouchableOpacity style={{marginBottom: 10}} onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                            <View><Text>{item.title}</Text></View>
                        </TouchableOpacity>
                        <View>
                            { item.favorited ?
                                <Button rounded iconLeft disabled small>
                                    <Icon type="FontAwesome" name="plus" />
                                    <Text>Favorite</Text>
                                </Button>    
                                :
                                <Button rounded style={{backgroundColor:"#3498db"}} iconLeft small>
                                    <Icon type="FontAwesome" name="plus" />
                                    <Text>Favorite</Text>
                                </Button>
                            }
                            
                            
                        </View>
                </View>
            </ListItem>
        })}
        </View>
    );
  }
};


export default BannerComponent;