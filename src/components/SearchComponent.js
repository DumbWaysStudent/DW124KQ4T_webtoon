import React from "react";
import {View, Text, ListItem} from "native-base";
import {FlatList, TouchableOpacity, Image} from "react-native";
import env from "../../env";
import SafeAreaView from "react-native-safe-area-view";


export default class SearchComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <SafeAreaView>
            <FlatList
                data = {this.props.items}
                keyExtractor = {item => item.id.toString()}
                renderItem = {({item})=>(
                    <ListItem>
                        <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                            <Image style={{width: 50, height: 50, borderWidth: 1, borderColor: "#000"}}
                                source={{uri: `${env.baseUrl}/${item.image}`}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:10}} onPress={this.props.onDetailTitle.bind(this, item.id)}>
                            <View>
                                <Text>{item.title}</Text>
                                <Text>{item.user.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )}
            />
        </SafeAreaView>
        )
    }
}