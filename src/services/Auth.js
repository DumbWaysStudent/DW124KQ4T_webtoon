import { AsyncStorage } from "react-native";
import axios from "../utils/Api";
import { loginStarted, loginSuccess, loginFailure, resetAuth, registerAuthStarted, registerAuthSuccess, registerAuthFailure, changePhotoStarted, changePhotoSuccess, changePhotoFailure, changePhotoReset } from "../_actions/auth"

class Auth {
    save = async (data) => {
        for(var key in data){
            await AsyncStorage.setItem(`authUser.${key}`, data[key] );
        }
    }

    fetch = async (key) => {
        let res="";
        await AsyncStorage.getItem(`authUser.${key}`).then((data)=> res = data);
        return res;
    }

    exist = async () => {
        if(await this.fetch("token")){
            return true;
        }
        else{
            return false;
        }
    }

    destroy = async () => {
        await AsyncStorage.removeItem(`authUser.id`);
        await AsyncStorage.removeItem(`authUser.image`);
        await AsyncStorage.removeItem(`authUser.name`);
        await AsyncStorage.removeItem(`authUser.email`);
        await AsyncStorage.removeItem(`authUser.token`);
    }

    update = async (data, key) => {
        await AsyncStorage.removeItem(`authUser.${key}`);
        await AsyncStorage.setItem(`authUser.${key}`, data);
    }

    changePhoto = (token, data) => {
        var formdata = new FormData;
        for(var key in data){
            formdata.append(key, data[key]);
        }
        return dispatch => {
            dispatch(changePhotoStarted());
            axios({
                method: 'POST',
                headers: { 'content-type': 'multipart/form-data',
                    "authorization": `Bearer ${token}`
                },
                data: formdata,          
                url: `/auth/change-photo`
            }).then(result=>{
                dispatch(changePhotoSuccess(`storage/${result.data.data.data}`));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(changePhotoFailure(err.response));
                }
                else{
                    dispatch(changePhotoFailure(err));
                }
            });
        }
    }

    resetChangePhoto = () => {
        return dispatch => {
            dispatch(changePhotoReset());
        }
    }

    register = (data) => {
        return dispatch=>{
            dispatch(registerAuthStarted());
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: data,          
                url: `/auth/register`
            }).then(result=>{
                dispatch(registerAuthSuccess(result.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(registerAuthFailure(err.response));
                }
                else{
                    dispatch(registerAuthFailure(err));
                }
            });
        }
    }

    login = (data) => {
        return dispatch => {
            dispatch(loginStarted());
            axios({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: data,          
                url: `/auth/authenticate`
            }).then(result=>{
                dispatch(loginSuccess(result.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(loginFailure(err.response));
                }
                else{
                    dispatch(loginFailure(err));
                }
            });
        }
    }

    resetAuth = ()=>{
        return dispatch=>{dispatch(resetAuth())};
    }

}

export default new Auth;