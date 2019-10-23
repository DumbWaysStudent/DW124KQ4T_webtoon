import React from 'react';
import { Container, Content, Item, Input, Card, CardItem, Body, Button, Text, H1, Icon } from 'native-base';
import {StyleSheet, View} from 'react-native';


import axios from "../utils/Api";
import env from '../utils/Env';
import Auth  from '../services/Auth';


import { connect } from 'react-redux';

import { saveAuth, saveAuthPending } from '../_actions/auth'


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
        var data = {
                email: this.state.inputEmail,
                password: this.state.inputPassword
        };
        this.props.login(data);
    }
    
    loginSuccess = () =>{
            Auth.save(this.props.auth.data);
            this.props.navigation.navigate('Main');
    }

    loginFail = () => {
        let error = this.props.auth.loginAuthError;
        if(typeof error.data !== "undefined" && typeof error.data.msg !== "undefined"){
            alert(error.data.msg);
        }
        else{
            alert("Check your internet connection!");
        }
        this.props.authReset();
    }

  render() {
    return (
        <Container style={styles.container}>
            {(this.props.auth.isLoginAuthLoading === false && this.props.auth.data)?<>{this.loginSuccess()}</>:<></>}
            {(this.props.auth.isLoginAuthLoading === false && this.props.auth.loginAuthError)?<>{this.loginFail()}</>:<></>}
            <Content>
                <Card>
                    <CardItem>
                        <Body>
                            <View style={styles.form}>
                                <H1 style={styles.title}>Log In</H1>
                                <Text style={styles.subTitle}>Login with your account WEBTOON</Text>
                                <Item>
                                    <Input placeholder="E-mail" value={this.state.inputEmail} onChangeText={this.handleInputEmail} />
                                </Item>
                                <Item last>
                                    <Input placeholder="Password" value={this.state.inputPassword} secureTextEntry={this.state.isSecurePassword} onChangeText={this.handleInputPassword} />
                                    <Button onPress={this.handleShowHidePassword} transparent>
                                        <Icon style={styles.buttonEyeIcon} type="FontAwesome" name={this.state.isSecurePassword ? "eye-slash":"eye"} />
                                    </Button>
                                </Item>
                                {((this.state.isSubmitEnable) ) ?
                                    <> 
                                    <Button rounded onPress={this.handleSubmit} style={{...styles.buttonLogin, backgroundColor: '#3498db'}} block>
                                        <Text>Log In</Text>
                                    </Button>
                                    </>
                                        : 
                                    <Button rounded disabled style={styles.buttonLogin} block>
                                        <Text>Log In</Text>
                                    </Button>
                                }
                                <Button transparent style={styles.buttonLogin} block onPress={()=>this.props.navigation.navigate("Register")}>
                                        <Text>Join Us</Text>
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
    title: {color: "#3498db"},
    subTitle: {color: "#bdc3c7"},
    buttonEyeIcon: {color:'#3498db'}
  });


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = {
    login: Auth.login,
    authReset: Auth.resetAuth
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);