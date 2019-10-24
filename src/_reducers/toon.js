const initialState = {
    all: [],
    isAllLoading: false,
    allError: null,
    banners: [],
    isBannerLoading: false,
    bannerError: null,
    favorites: [],
    isFavoriteLoading: false,
    favoriteError: null,
    searchResult: [],
    isSearchResultLoading: false,
    searchResultError: null,
    detailToon: null,
    isDetailToonLoading: false,
    detailToonError: null,
    episodeToon: [],
    isEpisodeToonLoading: false,
    episodeToonError: null,
    imageEpisode: null,
    isImageEpisodeLoading: false,
    imageEpisodeError: null
}

const toon = (state = initialState, action) => {
    let imageEpisode = state.imageEpisode;
    switch (action.type) {
    case 'GET_ALL_TOON_PENDING':
        return {
            ...state,
            isAllLoading: true,
            allError:null
        }
    case 'GET_ALL_TOON_SUCCESS':
        return {
            ...state,
            isAllLoading: false,
            all: action.payload,
            allError:null
        } 
    case 'GET_ALL_TOON_FAILURE':
        return {
            ...state,
            isAllLoading: false,
            allError: action.payload
        }  
    case 'GET_BANNER_TOON_PENDING':
        return {
            ...state,
            isBannerLoading: true,
            bannerError:null
        }
    case 'GET_BANNER_TOON_SUCCESS':
        return {
            ...state,
            isBannerLoading: false,
            banners: action.payload,
            bannerError:null
        } 
    case 'GET_BANNER_TOON_FAILURE':
        return {
            ...state,
            isBannerLoading: false,
            bannerError: action.payload
        }  
    case 'GET_FAVORITE_TOON_PENDING':
        return {
            ...state,
            isFavoriteLoading: true,
            favoriteError:null
        }
    case 'GET_FAVORITE_TOON_SUCCESS':
        return {
            ...state,
            isFavoriteLoading: false,
            favorites: action.payload,
            favoriteError:null
        } 
    case 'GET_FAVORITE_TOON_FAILURE':
        return {
            ...state,
            isFavoriteLoading: false,
            favoriteError: action.payload
        }  
    case 'GET_SEARCH_PENDING':
        return {
            ...state,
            isSearchResultLoading: true,
            searchResultError:null
        }
    case 'GET_SEARCH_SUCCESS':
        return {
            ...state,
            isSearchResultLoading: false,
            searchResult: action.payload,
            searchResultError:null
        } 
    case 'GET_SEARCH_FAILURE':
        return {
            ...state,
            isSearchResultLoading: false,
            searchResultError: action.payload
        }  
    case 'GET_DETAIL_TOON_PENDING':
        return {
            ...state,
            isDetailToonLoading: true,
            detailToonError:null,
            detailToon: null
        }
    case 'GET_DETAIL_TOON_SUCCESS':
        return {
            ...state,
            isDetailToonLoading: false,
            detailToon: action.payload,
            detailToonError:null
        } 
    case 'GET_DETAIL_TOON_FAILURE':
        return {
            ...state,
            isDetailToonLoading: false,
            detailToonError: action.payload
        }  
    case 'GET_EPISODE_TOON_PENDING':
        return {
            ...state,
            isEpisodeToonLoading: true,
            episodeToon:[],
            episodeToonError: null
        }
    case 'GET_EPISODE_TOON_SUCCESS':
        return {
            ...state,
            isEpisodeToonLoading: false,
            episodeToon: action.payload,
            episodeToonError:null
        } 
    case 'GET_EPISODE_TOON_FAILURE':
        return {
            ...state,
            isEpisodeToonLoading: false,
            episodeToonError: action.payload
        }  
    case 'GET_IMAGE_EPISODE_STARTED':
        return {
            ...state,
            imageEpisode: null,
            isImageEpisodeLoading: true,
            imageEpisodeError: null
        }
    case 'GET_IMAGE_EPISODE_SUCCESS':
        return {
            ...state,
            imageEpisode: action.payload,
            isImageEpisodeLoading: false,
            imageEpisodeError: null
        }
    case 'GET_IMAGE_EPISODE_FAILURE':
        return {
            ...state,
            imageEpisode: null,
            isImageEpisodeLoading: false,
            imageEpisodeError: action.payload
        }
    case 'ADD_IMAGE_TO_EPISODE':
        if(imageEpisode!=null){
            imageEpisode.images.push(action.payload);
        }
        return {
            ...state,
            imageEpisode
        }
    case 'DELETE_IMAGE_FROM_EPISODE':
        if(imageEpisode!=null){
                imageEpisode.images = imageEpisode.images.filter((item)=>item.id!==action.payload);
            }
        return {
            ...state,
            imageEpisode
        }
    case 'ADD_TOON_TO_FAVORITE':
        let index = state.all.findIndex(item => item.id === action.payload.toon.id);
        state.all[index].isFavorited=true;
        state.favorites.unshift(action.payload);
        return {
            ...state,
            favorites: state.favorites,
            all: state.all
        }
    default:
        return state;
    }
  }
  
  export default toon;