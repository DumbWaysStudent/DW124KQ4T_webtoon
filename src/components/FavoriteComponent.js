import React from 'react';
import { Card, CardItem, Body, Text } from 'native-base';
import { Image, TouchableOpacity, Dimensions, FlatList, StyleSheet } from 'react-native';


import env from '../utils/Env';


const {width, height} = Dimensions.get('window');


class FavoriteComponent extends React.Component {

    constructor(props){
        super(props);
    }

  render(){
    return (
      <FlatList
        horizontal
        style={styles.flatList}
        data = {this.props.items}
        keyExtractor = {(item) => typeof item.toon === "undefined" ? item.id.toString() : item.toon.id.toString()  }
        renderItem = {({item})=>(
        <>
          {(typeof item.toon === "undefined")?
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                 <Card style={styles.card}>
                     <CardItem style={styles.cardItem}>
                         <Body>
                             <Image
                             style={styles.image}
                             source={{uri: `${env.baseUrl}/${item.image}`}} />
                             <Text>{ item.title }</Text>
                         </Body>
                     </CardItem>
                 </Card>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                 <Card style={styles.card}>
                     <CardItem style={styles.cardItem}>
                         <Body>
                             <Image
                             style={styles.image}
                             source={{uri: `${env.baseUrl}/${item.toon.image}`}} />
                             <Text>{ item.toon.title }</Text>
                         </Body>
                     </CardItem>
                 </Card>
          </TouchableOpacity>
        }
        </>
        )}
      />
    );
  }
};


const styles = StyleSheet.create({
  flatList: {flex:1, flexDirection:'row'},
  card: {marginRight: 10, width: ((width/3)*(80/100))},
  cardItem: { paddingLeft: 10},
  image: {width: ((width/3)*(65/100)), height: 90}

});


export default FavoriteComponent;