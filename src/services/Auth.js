import { AsyncStorage } from "react-native";
import axios from "../utils/Api";

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

    changePhoto = async (data) => {
        var formdata = new FormData;
        var token = await this.fetch("token")
        for(var key in data){
            formdata.append(key, data[key]);
        }
        return axios({
            method: 'POST',
            headers: { 'content-type': 'multipart/form-data',
                "authorization": `Bearer ${token}`
            },
            data: formdata,          
            url: `/auth/change-photo`
        });
    }

    register = async (data) => {
        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,          
            url: `/auth/register`
        });
    }

    login = async (data) => {
        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: data,          
            url: `/auth/authenticate`
        });
    }

}

export default new Auth;