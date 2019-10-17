import React from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"


import Auth  from '../services/Auth';


const {width, height} = Dimensions.get('window');


export default class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props);
    }

    async componentDidMount(){
        if(await Auth.exist()){
            this.props.navigation.navigate("Main");
        }
        else{
            this.props.navigation.navigate("Login");
        }
    }

    render() {
        return <View style={styles.container}>
            <View style = {styles.circleShape} >
                <Text style={styles.loadingStyle}>Loading</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "center", alignItems: "center"},
    circleShape: {width: (width*(50/100)), height: (width*(50/100)), borderRadius:(width*(50/100))/2, backgroundColor: "#3498db", justifyContent:"center", alignItems:"center"},
    loadingStyle: {color:"#fff",fontSize: 30, textTransform: "uppercase", fontWeight: "bold"}
});