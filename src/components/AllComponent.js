import React from 'react';
import { Button, Text, Icon, View } from 'native-base';
import {Image, TouchableOpacity, FlatList, StyleSheet} from "react-native"


import env from "../utils/Env";


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
            <View style={styles.itemWrap} key={item.id.toString()}>
                <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                    <Image style={styles.itemImage} source={{uri: `${env.baseUrl}/${item.image}`}} />
                </TouchableOpacity>
                <View style={styles.itemTextWrap}>
                        <TouchableOpacity style={styles.itemTextLink} onPress={this.props.onDetailTitle.bind(this, item.id)} key={item.id}>
                            <View><Text>{item.title}</Text></View>
                        </TouchableOpacity>
                        <View>
                            { item.isFavorited ?
                                <Button rounded iconLeft disabled small>
                                    <Icon type="FontAwesome" name="plus" />
                                    <Text>Favorite</Text>
                                </Button>    
                                :
                                <Button rounded style={styles.buttonFavorite} iconLeft small>
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

const styles = StyleSheet.create({
    itemWrap: {flex: 1, flexDirection:'row', marginBottom: 15},
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    itemTextLink: {marginBottom: 10},
    buttonFavorite: {backgroundColor:"#3498db"}

});


export default BannerComponent;