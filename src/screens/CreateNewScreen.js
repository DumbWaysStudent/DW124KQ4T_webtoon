import React from "react";
import { View, Text, Card, CardItem, Container, Content, Item, Body, Input, Button, Icon } from "native-base";
import { FlatList } from "react-native";

class CreateNewScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          headerRight: (
            <Button transparent
              onPress={() => {
                if(navigation.getParam("isReady")){
                    var submiting = navigation.state.params;
                    submiting.isNew = true;
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

        this.props.navigation.setParams({
            image: "https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90",
            title: "",
            episodes: [],
            isNew: false,
            isReady: false
        })

        this.state = {
            errors: []
        }
    }

    onChangeTitle = (text) => {
        var error = [];
        if(text === ""){
            error.push("Title is required!");
        }
        this.props.navigation.setParams({
            title: text
        });
        

        var allError = this.state.errors.filter((item)=> item.input !== "title");

        var json ={
            input: "title",
            errors: error
        }
        if(error.length > 0){
            allError.push(json);
        }

        this.checkError(json);

        
    }


    checkError = (json) => {
        this.setState(json);
        var allError = this.state.errors;

        if(allError.length > 0){
            this.props.navigation.setParams({
                isReady: false
            });
        }
        else{
            this.props.navigation.setParams({
                isReady: true
            });
        }

    }



    onAddEpisode = () => {
        
    }

    render(){
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Item>
                                    <Input value={this.props.navigation.getParam("title")} onChangeText={this.onChangeTitle} placeholder="Title" />
                                </Item>
                                <Item>
                                    <Text>Episode</Text>
                                </Item>
                                <FlatList
                                    data={this.props.navigation.getParam("episode")}
                                    renderItem={({item}) => (
                                        <View>
                                            <Text>{item.title}</Text>
                                        </View>
                                    )}
                                    keyExtractor={({item})=>item.id.toString()}
                                />
                                <Button block light onPress={this.onAddEpisode}>
                                    <Text>Add</Text>
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