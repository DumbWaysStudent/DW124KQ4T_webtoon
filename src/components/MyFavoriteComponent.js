import React from 'react';
import { View, Text } from 'native-base';
import { FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';


import env from '../utils/Env';


class MyFavoriteCompnent extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <FlatList
                style={styles.flatList}
                data = {this.props.items}
                keyExtractor = {item => item.toon.id.toString()}
                renderItem = {({item})=>(
                    <View style={styles.itemWrap}>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                            <Image style={styles.itemImage}
                                source={{uri: `${env.baseUrl}/${item.toon.image}`}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTextWrap} onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                            <View>
                                <Text style={styles.labelTitle}>{item.toon.title}</Text>
                                <Text style={styles.muted}>{`Created by ${item.toon.user.name}`}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        );
    }

}

const styles = StyleSheet.create({
    flatList: {marginTop: 15},
    itemWrap: {flex: 1, flexDirection:'row', marginBottom: 15},
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    labelTitle: {marginBottom: 5, marginTop: 5},
    muted: {color: "#bdc3c7"}
});

export default MyFavoriteCompnent;