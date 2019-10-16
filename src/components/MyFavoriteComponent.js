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
                data = {this.props.items}
                keyExtractor = {item => item.toon.id.toString()}
                renderItem = {({item})=>(
                    <ListItem>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                            <Image style={{width: 50, height: 50, borderWidth: 1, borderColor: "#000"}}
                                source={{uri: `${env.baseUrl}/${item.toon.image}`}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 10}} onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                            <View>
                                <Text>{item.toon.title}</Text>
                                <Text>{`Created by ${item.toon.user.name}`}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )}
            />
        );
    }

}

export default MyFavoriteCompnent;