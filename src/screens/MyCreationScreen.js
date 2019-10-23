import React from "react";
import { View, Text, Container, Content, CardItem, Fab, Icon, Body, Header, Left, Button, Title, Right } from "native-base";
import { FlatList, TouchableOpacity, Image, StyleSheet, RefreshControl } from "react-native";
import { connect } from "react-redux";


import env from '../utils/Env';
import Toon  from '../services/Toon';


class MyCreationScreen extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            sending: 0,
            isRefreshing: false
        }
    }

    componentDidMount(){
            this.onLoad();
    }

    onLoad = () => {
        this.props.myToon(this.props.auth.data.token);
    }

    onDetailTitle = (id) => {
        var item = this.state.items.filter((item, index)=> item.id === id)[0];
        this.props.navigation.navigate("DetailTitle", item);
    }

    render(){
        return (
            <Container style={{paddingTop:25}}>
                <Header style={{backgroundColor:"#fff", borderBottomColor: "#ddd", borderBottomWidth: 4}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' style={{color: "#3498db"}} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:"#000"}}>My Webtoon</Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    refreshControl={
                        <RefreshControl
                        onRefresh={this.onLoad}
                        refreshing = {this.props.mytoon.isLoading} />
                    }
                >
                    <CardItem>
                        <Body style={{flex: 1, flexDirection: "row"}}>
                            <FlatList
                                data = {this.props.mytoon.toons}
                                keyExtractor = {item => item.id.toString()}
                                renderItem = {({item})=>(
                                    <View style={styles.itemWrap}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditToon", {id:item.id})}>
                                            {item.image==="" ?
                                            <View style={styles.itemImage} />
                                            : 
                                            <Image style={styles.itemImage}
                                                source={{uri: `${env.baseUrl}/${item.image}`}} />
                                            }
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.itemTextWrap} onPress={()=>this.props.navigation.navigate("EditToon", {id:item.id})} style={{marginLeft: 20}}>
                                            <View>
                                                <Text style={styles.labelTitle}>{item.title} {`${(item.isDraft)?"(draft)":""}`}</Text>
                                                <Text style={styles.labelTotalEpisode}>{ item.totalEpisode } episode(s)</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </Body>
                    </CardItem>
                </Content>
                <Fab
                    active={false}
                    direction="up"
                    style={{ backgroundColor: '#3498db' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate("CreateNew")}>
                        <Icon name="plus" type="FontAwesome" />
                </Fab>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    labelTitle: {marginBottom: 5, marginTop: 5},
    labelTotalEpisode: {color: "#bdc3c7"},
    itemWrap: {flex: 1, flexDirection:'row', marginBottom: 15}
});

const mapStateToProps = (state) => ({
    mytoon: state.mytoon,
    toon: state.toon,
    auth: state.auth
})

const mapDispatchToProps = {
    myToon: Toon.myToon
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCreationScreen);