import React from "react";
import {View, Text, ListItem} from "native-base";
import {FlatList, TouchableOpacity, Image} from "react-native";
import axios from "axios";
import env from "../../env";


export default class SearchComponent extends React.Component {
    constructor(props){
        super(props);
    }

    

    

    render(){
        return (

            <FlatList
                data = {this.props.items}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({item})=>(
                    <ListItem>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                            <Image style={{width: 50, height: 50}}
                                source={{uri: `${env.baseUrl}/${item.image}`}} />
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
        )
    }
}