import { AsyncStorage } from "react-native";

export default class Auth {
    save = async (data) => {
        console.log("data");
        for(key in data){
                
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

    get = async () => {
        return "data"
    }

}