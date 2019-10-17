import React from "react";
import { View, Text, ListItem } from "native-base";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";


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
                            <Image style={styles.itemImage}
                                source={{uri: `${env.baseUrl}/${item.image}`}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemTextWrap} onPress={this.props.onDetailTitle.bind(this, item.id)}>
                            <View>
                                <Text style={styles.labelTitle}>{item.title}</Text>
                                <Text style={styles.muted}>{item.user.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    labelTitle: {marginBottom: 5, marginTop: 5},
    muted: {color: "#bdc3c7"}
});