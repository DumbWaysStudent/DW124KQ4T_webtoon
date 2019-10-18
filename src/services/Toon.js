import axios from "../utils/Api";
import Auth from './Auth';


class Toon{

    all = async () => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            url: `/toons`
        });
    }

    favorite = async () => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            url: `/toons/favorite`
        });
    }

    banner = async () => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            url: `/toons/banner`
        });
    }

    search = async (text) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            url: `/toons/search/${text}`
        });
    }

    detail = async (id) => {
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `/toon/${id}`
        })
    }

    episodeList = async (detailId) => {
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `/toon/${detailId}/episodes`
        });
    }

    episodeDetail = async (toonId, episodeId) => {
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `/toon/${toonId}/episode/${episodeId}`
        });
    }

    delete = async (id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },   
            url: `/toon/${id}`
        });
    }

    update = async (data, id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: data,          
            url: `/toon/${id}/edit`
        });
    }

    create = async (data) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: data,          
            url: `/toon/create`
        });
    }

    myToon = async () => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            url: `/my-toons`
        });
    }

    deleteEpisode = async (toonId, id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },   
            url: `/toon/${toonId}/episode/${id}`
        });
    }

    updateEpisode = async (data, toonId, id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: data,          
            url: `/toon/${toonId}/episode/${id}/edit`
        });
    }

    createEpisode = async (data, toonId) => {
        var token = await Auth.fetch(`token`);
        var formdata = new FormData;
        for(var key in data){
            if(Array.isArray(data[key])){
                for(var i =0; i<data[key].length; i++){
                    formdata.append(key, data[key][i]);
                }
            }
            else{
                formdata.append(key, data[key]);
            }
        }
        return axios({
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            },
            data: formdata,          
            url: `/toon/${toonId}/episode/create`
        });
    }

    uploadEpisodeImage = async (data, toonId, id) => {
        var token = await Auth.fetch(`token`);
        var formdata = new FormData;
        for(var key in data){
            formdata.append(key, data[key]);
        }
        return axios({
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            },
            data: formdata,          
            url: `/toon/${toonId}/episode/${id}/upload-image`
        });
    }

    deleteEpisodeImage = async (toonId, id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },        
            url: `/toon/${toonId}/episode/delete-image/${id}`
        });
    }
}

export default new Toon;