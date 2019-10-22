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
    episodeToonError: null
}

const toon = (state = initialState, action) => {
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
    default:
        return state;
    }
  }
  
  export default toon;