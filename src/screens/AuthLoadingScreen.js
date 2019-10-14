import React from "react"
import { View, Text } from "react-native"
import Auth  from '../services/Auth';

export default class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props);
    }

    async componentDidMount(){
        if(await (new Auth).exist()){
            this.props.navigation.navigate("Main");
        }
        else{
            this.props.navigation.navigate("Login");
        }
    }

    render() {
        return <View>
            <Text>Loading</Text>
        </View>
    }
}