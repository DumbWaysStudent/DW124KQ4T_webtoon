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
            url: `/toons/all`
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

    episodeDetail = async (episodeId) => {
        return axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            url: `/toon-episode/${episodeId}`
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

    deleteEpisode = async (id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },   
            url: `/toon-episode/${id}`
        });
    }

    updateEpisode = async (data, id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: data,          
            url: `/toon-episode/${id}/edit`
        });
    }

    createEpisode = async (data) => {
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
            url: `/toon-episode/create`
        });
    }

    uploadEpisodeImage = async (data, id) => {
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
            url: `/toon-episode/${id}/upload-image`
        });
    }

    deleteEpisodeImage = async (id) => {
        var token = await Auth.fetch(`token`);
        return axios({
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },        
            url: `/toon-episode/delete-image/${id}`
        });
    }
}

export default new Toon;