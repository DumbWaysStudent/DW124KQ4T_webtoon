import React from "react";
import { View, Text, Card, CardItem, Container, Content, Item, Body, Input, Button, Icon, ListItem } from "native-base";
import { FlatList, Image } from "react-native";

class CreateNewScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                if(navigation.getParam("isReady")){
                    var submiting = navigation.state.params;
                    submiting.isNew = true;
                    delete submiting.isReady;
                    delete submiting.isChanged;
                    delete submiting.errors;
                    navigation.navigate("MyCreation", submiting);
                }
              }}>
                  <Icon name="check" type="FontAwesome" />
            </Button>
          )

        };
    }

    constructor(props){
        super(props);


        this.state = {
            image: "",
            title: "",
            episodes: [],
            isNew: false,
            isReady: false,
            errors: [],
            isChanged: true
        }
    }

    componentDidMount(){
        if(this.state.isChanged){

            this.props.navigation.setParams({
                ...this.state
            })
            
            this.setState({
                isChanged: false
            });
        }
    }

    componentDidUpdate(){
        if(this.state.isChanged){

            this.props.navigation.setParams({
                ...this.state
            })
            
            this.setState({
                isChanged: false
            });
        }
        if(typeof this.props.navigation.getParam('newEpisode') !== "undefined" && this.state.episodes.filter((item)=>item.time===this.props.navigation.getParam('newEpisode').time).length===0){
            var eps = this.state.episodes;
            eps.unshift(this.props.navigation.getParam('newEpisode'));

            this.setState({
                image: eps[0].images[0].src,
                episodes: eps
            });

            console.log(this.state.episodes);
        }
    }

    onChangeTitle = (text) => {
        var error = [];
        if(text === ""){
            error.push("Title is required!");
        }
        

        var allError = this.state.errors.filter((item)=> item.input !== "title");

        var obj ={
            input: "title",
            errors: error
        }
        if(error.length > 0){
            allError.push(obj);
        }

        this.checkError({errors: allError, title: text});

        
    }


    checkError = (json) => {
        var allError = this.state.errors;

        var isReady = true

        if(allError.length > 0){
            isReady= false;
        }

        var state = {...json, isReady: isReady, isChanged: true}
        this.setState(state);


    }



    onAddEpisode = () => {
        this.props.navigation.navigate("CreateNewEpisode");
    }

    render(){
        return (
            <Container>
                <Content>
                    <Card style={{flex: 1}}>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.state.title} onChangeText={this.onChangeTitle} placeholder="Title" />
                                </Item>
                                <Item>
                                    <Text>Episode</Text>
                                </Item>
                                <FlatList
                                    data={this.state.episodes}
                                    renderItem={({item}) => (
                                        <ListItem>
                                            <Image style={{width: 50, height: 50}} source={item.cover} />
                                            <View style={{marginLeft: 20}}>
                                                    <Text>
                                                        {item.name}
                                                    </Text>
                                            </View>
                                        </ListItem>
                                    )}
                                    keyExtractor={(item)=>item.time.toString()}
                                />
                                <Button block light onPress={this.onAddEpisode}>
                                    <Text>Add Episode</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default CreateNewScreen;