import React from 'react';

import { Item, Button, Text, Icon, ListItem, View } from 'native-base';
import {Image, TouchableOpacity} from "react-native"
import env from "../../env"
import { FlatList } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';


class BannerComponent extends React.Component {

    constructor(props){
        super(props);
    }

    

  render() {
    return (
        <FlatList
            style={{flex: 1, marginTop: 15}}
            data = {this.props.items}
            keyExtractor = {item => item.id.toString()}
            renderItem = {({item})=>(
            <View style={{flex: 1, flexDirection:'row', marginBottom: 15}} key={item.id.toString()}>
                <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                    <Image style={{width: 65, height: 65,borderWidth: 1, borderColor: "#000"}} source={{uri: `${env.baseUrl}/${item.image}`}} />
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
            </View>
        )}
       />
    );
  }
};


export default BannerComponent;