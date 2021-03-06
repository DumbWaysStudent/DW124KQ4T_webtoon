/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';

import {StyleSheet, View} from 'react-native';


class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isSecurePassword: true,
            inputEmail: "",
            inputPassword: "",
            errors: [],
            isSubmitEnable: false,
            countMount: 0
        }
    }

    componentDidMount(){
        if(this.state.countMount === 0){
            this.handleInputEmail("");
            this.handleInputPassword("");
            this.setState({
                countMount: this.state.countMount+1
            });
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isSecurePassword: !this.state.isSecurePassword
        });
    }

   
    
    handleInputEmail = (text) => {
        var errors=[];
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(text) === false){
                errors.push("E-mail is invalid!");
            }


            var allError = this.state.errors.filter((item, index)=> item.input !== "email");

            if(errors.length>0){
                allError.push({
                    input: "email",
                    errors: errors
                });
            }

            this.checkError({
                inputEmail: text,
                errors: allError  
            });
    }

    handleInputPassword = (text) => {
        var errors = [];
        if(text === "" || text === null){
            errors.push("Password is required!");
        }
        var allError = this.state.errors.filter((item, index)=> item.input !== "password");

            if(errors.length>0){
                allError.push({
                    input: "password",
                    errors: errors
                });
            }

            this.checkError({
                inputPassword: text,
                errors: allError  
            });
    }

    checkError = (json) => {
        var isEnabeled = false;

        if(json.errors.length>0){
            isEnabeled = false
        }
        else{
            isEnabeled =  true
        }
        var objs = {...json, isSubmitEnable: isEnabeled};

        this.setState(objs);
    }

    handleSubmit = () => {
        this.props.navigation.navigate("Main");
    }

  render() {
    return (
        <Container style={styles.container}>
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <View style={styles.form}>
                                <H1>Log In</H1>
                                <Text>Login with your account WEBTOON</Text>
                                <Item>
                                    <Input placeholder="E-mail" value={this.state.inputEmail} onChangeText={this.handleInputEmail} />
                                </Item>
                                <Item last>
                                    <Input placeholder="Password" value={this.state.inputPassword} secureTextEntry={this.state.isSecurePassword} onChangeText={this.handleInputPassword} />
                                    <Button onPress={this.handleShowHidePassword} transparent>
                                        <Icon type="FontAwesome" name={this.state.isSecurePassword ? "eye-slash":"eye"} />
                                    </Button>
                                </Item>
                                {((this.state.isSubmitEnable) ) ? 
                                    <Button onPress={this.handleSubmit} style={styles.buttonLogin} block>
                                        <Text>Log In</Text>
                                    </Button>
                                        : 
                                    <Button disabled style={styles.buttonLogin} block>
                                        <Text>Log In</Text>
                                    </Button>
                                }
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
  }
};


const styles = StyleSheet.create({
    buttonLogin: {
        marginTop: 20
    },
    form: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
  });

export default LoginScreen;