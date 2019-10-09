import React from 'react';
import { View, Text, ListItem } from 'native-base';
import { FlatList, Image, TouchableOpacity } from 'react-native';

class MyFavoriteCompnent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: props.items
        }
    }

    render() {
        return (
            <FlatList
                data = {this.state.items}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({item})=>(
                    <ListItem>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                            <Image style={{width: 50, height: 50}}
                                source={{uri: item.image}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                            <View>
                                <Text>{item.title}</Text>
                                <Text>100+ favorite</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )}
            />
        );
    }

}

export default MyFavoriteCompnent;