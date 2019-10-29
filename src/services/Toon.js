import axios from "../utils/Api";
import { getAllToonStarted, getAllToonSuccess, getAllToonFailure, getBannerToonStarted, getBannerToonSuccess, getBannerToonFailure, getFavoriteToonStarted, getFavoriteToonSuccess, getFavoriteToonFailure, getSearchStarted, getSearchSuccess, getDetailToonStarted, getDetailToonSuccess, getDetailToonFailure, getEpisodeToonStarted, getEpisodeToonSuccess, getEpisodeToonFailure,getImageEpisodeStarted, getImageEpisodeSuccess, getImageEpisodeFailure, addImageToEpisode, deleteImageFromEpisode, addToonToFavorite } from '../_actions/toon';

import { getMyToonStarted, getMyToonSuccess, getMyToonFailure, getUpdateToonStarted, getUpdateToonFailure, getUpdateToonSuccess, createToonStarted, createToonSuccess, createToonFailure, createEpisodeStarted, createEpisodeSuccess, resetCreateEpisode, createEpisodeFailure, resetToonTemp, deleteToonStarted, deleteToonSuccess, deleteToonFailure, uploadImageEpisodeSuccess, uploadImageEpisodeStarted, uploadImageEpisodeFailure, resetUploadImageEpisodeSuccess, updateEpisodeStarted, updateEpisodeSuccess, updateEpisodeFailure, deleteEpisodeStarted, deleteEpisodeSuccess, deleteEpisodeFailure, resetDeleteEpisodeSuccess, deleteEpisodeImageStarted, deleteEpisodeImageSuccess, deleteEpisodeImageFailure, resetDeleteEpisodeImageSuccess, favoriteToonStarted, favoriteToonSuccess, favoriteToonFailure, resetFavoriteToon } from '../_actions/mytoon'


class Toon{

    all = (token) => {
        return dispatch =>{
            dispatch(getAllToonStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                url: `/toons`
            }).then(result=>{

                dispatch(getAllToonSuccess(result.data.data.data));

            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getAllToonFailure(err.response));
                }
                else{
                    dispatch(getAllToonFailure(err));
                }
            });
        }
    }

    favorite = (token) => {
        return dispatch =>{
            dispatch(getFavoriteToonStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                url: `/toons/favorite`
            }).then(result=> {
                dispatch(getFavoriteToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getFavoriteToonFailure(err.response));
                }
                else{
                    dispatch(getFavoriteToonFailure(err));
                }
            });
        }
    }

    banner = (token) => {
        return dispatch => {
            dispatch(getBannerToonStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                url: `/toons/banner`
            }).then(result=>{
                dispatch(getBannerToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getBannerToonFailure(err.response));
                }
                else{
                    dispatch(getBannerToonFailure(err));
                }
            });
        };
    }

    search = (token, text) => {
        return dispatch => {
            dispatch(getSearchStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                url: `/toons/search/${text}`
            }).then(result=>{
                dispatch(getSearchSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getSearchFailure(err.response));
                }
                else{
                    dispatch(getSearchFailure(err));
                }
            });
        }
    }

    detail = (id) => {
        return dispatch=>{
            dispatch(getDetailToonStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                url: `/toon/${id}`
            }).then(result=>{
                dispatch(getDetailToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getDetailToonFailure(err.response));
                }
                else{
                    dispatch(getDetailToonFailure(err));
                }
            });
        }
    }

    episodeList = (detailId) => {
        return dispatch => {
            dispatch(getEpisodeToonStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                url: `/toon/${detailId}/episodes`
            }).then(result=>{
                dispatch(getEpisodeToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getEpisodeToonFailure(err.response));
                }
                else{
                    dispatch(getEpisodeToonFailure(err));
                }
            });
        }
    }

    episodeDetail = (toonId, episodeId) => {
        return dispatch => {
            dispatch(getImageEpisodeStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                url: `/toon/${toonId}/episode/${episodeId}`
            }).then(result=>{
                dispatch(getImageEpisodeSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getImageEpisodeFailure(err.response));
                }
                else{
                    dispatch(getImageEpisodeFailure(err));
                }
            });
        }
    }

    delete = (token, id) => {
        return dispatch => {
            dispatch(deleteToonStarted());
            axios({
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },   
                url: `/toon/${id}`
            }).then(result=>{
                dispatch(deleteToonSuccess(id));

            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(deleteToonFailure(err.response));
                }
                else{
                    dispatch(deleteToonFailure(err));
                }

            });
        }
    }

    update = (token, data, id) => {
        return dispatch => {
            dispatch(getUpdateToonStarted());
            axios({
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                data: data,          
                url: `/toon/${id}/edit`
            }).then(result=>{
                dispatch(getUpdateToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getUpdateToonFailure(err.response));
                }
                else{
                    dispatch(getUpdateToonFailure(err));
                }
                
            });
        }
    }

    create = (token, data) => {
        return dispatch => {
            dispatch(createToonStarted());
            axios({
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                data: data,          
                url: `/toon/create`
            }).then(result=>{

                dispatch(createToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(createToonFailure(err.response));
                }
                else{
                    dispatch(createToonFailure(err));
                }
            });
        }
    }

    myToon = (token) => {
        return dispatch=> {
            dispatch(getMyToonStarted());
            axios({
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                url: `/my-toons`
            }).then(result=>{  
                dispatch(getMyToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(getMyToonFailure(err.response));
                }
                else{
                    dispatch(getMyToonFailure(err));
                }
            });

        }
    }

    deleteEpisode = (token, toonId, id) => {
        return dispatch => {
            dispatch(deleteEpisodeStarted());
            axios({
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },   
                url: `/toon/${toonId}/episode/${id}`
            }).then(result=>{
                dispatch(deleteEpisodeSuccess(id));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(deleteEpisodeFailure(err.response));
                }
                else{
                    dispatch(deleteEpisodeFailure(err));
                }
            });
        }
    }

    resetDeleteEpisodeSuccess = () => {
        return dispatch => {
            dispatch(resetDeleteEpisodeSuccess());
        }
    }

    updateEpisode = (token, data, toonId, id) => {
        return dispatch=>{
            dispatch(updateEpisodeStarted());
            axios({
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                data: data,          
                url: `/toon/${toonId}/episode/${id}/edit`
            }).then(result=>{
                dispatch(updateEpisodeSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(updateEpisodeFailure(err.response));
                }
                else{
                    dispatch(updateEpisodeFailure(err));
                }
            });
        }
    }

    

    createEpisode = (token, data, toonId) => {
        let formdata = new FormData;
        for(let key in data){
            if(Array.isArray(data[key])){
                for(let i =0; i<data[key].length; i++){
                    formdata.append(key, data[key][i]);
                }
            }
            else{
                formdata.append(key, data[key]);
            }
        }
        return dispatch => {
            dispatch(createEpisodeStarted());
            axios({
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                },
                data: formdata,          
                url: `/toon/${toonId}/episode/create`
            }).then(result=>{
                dispatch(createEpisodeSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(createEpisodeFailure(err.response));
                }
                else{
                    dispatch(createEpisodeFailure(err));
                }
            });
        }
    }

    resetCreateEpisode = () => {
        return dispatch => {
            dispatch(resetCreateEpisode());
        }
    }

    resetToonTemp = () => {
        return dispatch => {
            dispatch(resetToonTemp());
        }
    }

    uploadEpisodeImage = (token, data, toonId, id) => {
        var formdata = new FormData;
        for(var key in data){
            formdata.append(key, data[key]);
        }
        return dispatch=>{
            dispatch(uploadImageEpisodeStarted());
            axios({
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                },
                data: formdata,          
                url: `/toon/${toonId}/episode/${id}/upload-image`
            }).then(result=>{
                dispatch(uploadImageEpisodeSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(uploadImageEpisodeFailure(err.response));
                }
                else{
                    dispatch(uploadImageEpisodeFailure(err));
                }
            });
        }
    }

    addImageToEpisode = (image) => {
        return dispatch => {
            dispatch(addImageToEpisode(image));
            dispatch(resetUploadImageEpisodeSuccess());
        }
    }

    deleteEpisodeImage = (token, toonId, id) => {
        return dispatch=> {
            dispatch(deleteEpisodeImageStarted());
            axios({
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },        
                url: `/toon/${toonId}/episode/delete-image/${id}`
            }).then(result=>{
                dispatch(deleteEpisodeImageSuccess(id));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(deleteEpisodeImageFailure(err.response));
                }
                else{
                    dispatch(deleteEpisodeImageFailure(err));
                }
            });
        }
    }
    deleteImageFromEpisode = (data) => {
        return dispatch=>{
            dispatch(deleteImageFromEpisode(data));
            dispatch(resetDeleteEpisodeImageSuccess());
        }
    }

    favoritingToon = (token, toonId) => {
        return dispatch=> {
            dispatch(favoriteToonStarted());
            axios({
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },        
                url: `/toon/favorite/${toonId}`
            }).then(result=>{
                dispatch(favoriteToonSuccess(result.data.data.data));
            }).catch(err=>{
                if(typeof err.response !== "undefined"){
                    dispatch(favoriteToonFailure(err.response));
                }
                else{
                    dispatch(favoriteToonFailure(err));
                }
            });
        }
    }

    addToonToFavorite = (data) => {
        return dispatch => {
            dispatch(addToonToFavorite(data));
            dispatch(resetFavoriteToon());
        }
    }
}

export default new Toon;