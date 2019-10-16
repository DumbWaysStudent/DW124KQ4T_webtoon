import React from 'react';

import { Card, CardItem, Body, Text } from 'native-base';


import {Image, TouchableOpacity, Dimensions} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import env from '../../env';
import { FlatList } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

const sliderWidth = 370;
const itemWidth = 120
const {width, height} = Dimensions.get('window');


class FavoriteComponent extends React.Component {

    constructor(props){
        super(props);
    }

    

  // render() {
  //   return (
  //     <Carousel
  //         ref={(c) => { this._carousel = c; }}
  //         data={this.props.items}
  //         renderItem={({item, index})=>(
  //           <>
  //             {(typeof item.toon === "undefined")?
  //               <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
  //                 <Card>
  //                     <CardItem>
  //                         <Body>
  //                             <Image
  //                             style={{width: 90, height: 90}}
  //                             source={{uri: `${env.baseUrl}/${item.image}`}} />
  //                             <Text>{ item.title }</Text>
  //                         </Body>
  //                     </CardItem>
  //                 </Card>
  //               </TouchableOpacity>
  //             :
  //             <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
  //               <Card>
  //                   <CardItem>
  //                       <Body>
  //                           <Image
  //                           style={{width: 90, height: 90}}
  //                           source={{uri: `${env.baseUrl}/${item.toon.image}`}} />
  //                           <Text>{ item.toon.title }</Text>
  //                       </Body>
  //                   </CardItem>
  //               </Card>
  //             </TouchableOpacity>
  //             }
  //           </>
            
  //         )}
  //         sliderWidth={sliderWidth}
  //         itemWidth={itemWidth}
  //     />
  //   );
  // }

  render(){
    return (
      <FlatList
        horizontal
        style={{flex:1, flexDirection:'row'}}
        data = {this.props.items}
        keyExtractor = {(item) => typeof item.toon === "undefined" ? item.id.toString() : item.toon.id.toString()  }
        renderItem = {({item})=>(
        <>
          {(typeof item.toon === "undefined")?
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.id)}>
                 <Card style={{marginRight: 10, width: ((width/3)*(80/100))}}>
                     <CardItem style={{ paddingLeft: 10}}>
                         <Body>
                             <Image
                             style={{width: ((width/3)*(65/100)), height: 90}}
                             source={{uri: `${env.baseUrl}/${item.image}`}} />
                             <Text>{ item.title }</Text>
                         </Body>
                     </CardItem>
                 </Card>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={this.props.onDetailTitle.bind(this, item.toon.id)}>
                 <Card style={{marginRight: 10, width: ((width/3)*(80/100))}}>
                     <CardItem style={{ paddingLeft: 10}}>
                         <Body>
                             <Image
                             style={{width: ((width/3)*(65/100)), height: 90}}
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


export default FavoriteComponent;