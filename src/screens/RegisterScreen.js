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
import axios  from 'axios';
import env  from '../../env';
import Auth  from '../services/Auth';


class RegisterScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isSecurePassword: true,
            inputName: "",
            inputEmail: "",
            inputPassword: "",
            errors: [],
            isSubmitEnable: false,
            countMount: 0
        }

    }

    async componentDidMount(){
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

   
    handleInputName = (text) => {
        var errors=[];
            if(text === ""){
                errors.push("Name is required!");
            }


            var allError = this.state.errors.filter((item, index)=> item.input !== "name");

            if(errors.length>0){
                allError.push({
                    input: "name",
                    errors: errors
                });
            }

            this.checkError({
                inputName: text,
                errors: allError  
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

    handleSubmit = async () => {
        var auth = (new Auth);
        await axios({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: {
                name: this.state.inputName,
                email: this.state.inputEmail,
                password: this.state.inputPassword
            },          
            url: `${env.apiUrl}/auth/register`
        }).then(async result=>{
            await auth.save(result.data.data);
            this.props.navigation.navigate('Main');
        }).catch(error=>{
            if(typeof error.response.data.errors !== "undefined"){
                var str = "";
                var error = error.response.data.errors;
                for(var key in error){
                    for(var i=0;i<error[key].length; i++){
                        str = str + error[key][i] + "\n";
                    }
                }
                alert(str);
            }
        });
    }

  render() {
    return (
        <Container style={styles.container}>
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <View style={styles.form}>
                                <H1 style={styles.title}>Register</H1>
                                <Item>
                                    <Input placeholder="Name" value={this.state.inputName} onChangeText={this.handleInputName} />
                                </Item>
                                <Item>
                                    <Input placeholder="E-mail" value={this.state.inputEmail} onChangeText={this.handleInputEmail} />
                                </Item>
                                <Item last>
                                    <Input placeholder="Password" value={this.state.inputPassword} secureTextEntry={this.state.isSecurePassword} onChangeText={this.handleInputPassword} />
                                    <Button onPress={this.handleShowHidePassword} transparent>
                                        <Icon style={{color:'#3498db'}} type="FontAwesome" name={this.state.isSecurePassword ? "eye-slash":"eye"} />
                                    </Button>
                                </Item>
                                {((this.state.isSubmitEnable) ) ? 
                                    <Button rounded onPress={this.handleSubmit} style={{...styles.buttonLogin, backgroundColor: '#3498db'}} block>
                                        <Text>Register</Text>
                                    </Button>
                                        : 
                                    <Button rounded disabled style={styles.buttonLogin} block>
                                        <Text>Register</Text>
                                    </Button>
                                }
                                <Button transparent style={styles.buttonLogin} block style={{marginTop: 10}} onPress={()=>this.props.navigation.navigate("Login")}>
                                        <Text>Already Have Account</Text>
                                </Button>
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
        flexDirection: 'row',
        backgroundColor: "#bdc3c7"
    },
    title: {
        color: "#3498db"
    }
  });

export default RegisterScreen;