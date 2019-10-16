import React from 'react';
import { View, Text, ListItem } from 'native-base';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import env from '../../env';

class MyFavoriteCompnent extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <FlatList
                style={{marginTop: 15}}
                data = {this.props.items}
                keyExtractor = {item => item.toon.id.toString()}
                renderItem = {({item})=>(
                    <View style={{flex: 1, flexDirection:'row', marginBottom: 15}}>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                            <Image style={{width: 65, height: 65, borderWidth: 1, borderColor: "#000"}}
                                source={{uri: `${env.baseUrl}/${item.toon.image}`}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 10}} onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                            <View>
                                <Text style={{marginBottom: 5, marginTop: 5}}>{item.toon.title}</Text>
                                <Text style={{color: "#bdc3c7"}}>{`Created by ${item.toon.user.name}`}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        );
    }

}

export default MyFavoriteCompnent;