const initialState = {
    toons: [],
    isLoading: false,
    error: null,
    isUpdateToonLoading: false,
    updateToonError: null,
    isCreateToonLoading: false,
    tempToon: null,
    createToonError: null,
    isCreateEpisodeLoading: false,
    createEpisodeSuccess: null,
    createEpisodeError: null,
    deleteToonLoading: false,
    deleteToonError: null,
}

const mytoon = (state = initialState, action) => {
    let toons = state.toons;
    switch (action.type) {

    case 'GET_MY_TOON_STARTED':
        return {
            ...state,
            isLoading: true,
            error: null
        }
    
    case 'GET_MY_TOON_SUCCESS':
        return {
            ...state,
            isLoading: false,
            toons: action.payload,
            error: null
        }
    
    case 'GET_MY_TOON_FAILURE':
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        }

    case 'GET_UPDATE_TOON_STARTED':
        return {
            ...state,
            isUpdateToonLoading: true,
            updateToonError: null
        }

    case 'GET_UPDATE_TOON_SUCCESS':
        let index = state.toons.findIndex(item => item.id === action.payload.id);
        if(index >= 0){
            toons[index] = action.payload;
        }
        else{
            toons.unshift(action.payload);
        }
        return {
            ...state,
            isUpdateToonLoading: false,
            updateToonError: null,
            toons: toons
        }
    
    case 'GET_UPDATE_TOON_FAILURE':
            return {
                ...state,
                isUpdateToonLoading: false,
                updateToonError: action.payload
            } 
    case 'CREATE_TOON_STARTED':
        return {
            ...state,
            isCreateToonLoading: true,
            createToonError: null,
            tempToon: null
        }

    case 'CREATE_TOON_SUCCESS':
        toons.unshift(action.payload);
        return {
            ...state,
            isCreateToonLoading: false,
            createToonError: null,
            toons: toons,
            tempToon: action.payload
        }
    
    case 'CREATE_TOON_FAILURE':
            return {
                ...state,
                isCreateToonLoading: false,
                createToonError: action.payload,
                tempToon: null
            }     
    case 'CREATE_EPISODE_STARTED':
        return {
            ...state,
            isCreateEpisodeLoading: true,
            createEpisodeError: null,
            createEpisodeSuccess: null
        }

    case 'CREATE_EPISODE_SUCCESS':
        return {
            ...state,
            isCreateEpisodeLoading: false,
            createEpisodeError: null,
            createEpisodeSuccess: action.payload
        }
    
    case 'CREATE_EPISODE_FAILURE':
            return {
                ...state,
                isCreateEpisodeLoading: false,
                createEpisodeError: action.payload,
                createEpisodeSuccess: null
            }   
    case 'RESET_CREATE_EPISODE_SUCCESS':
        return {
            ...state,
            isCreateEpisodeLoading: false,
            createEpisodeError: null,
            createEpisodeSuccess: null
        } 
    case 'RESET_TOON_TEMP':
            return {
                ...state,
                tempToon: null
            } 
    case 'DELETE_TOON_STARTED':
            return {
                ...state,
                deleteToonLoading: true,
                deleteToonError: null,
            } 
    
    case 'DELETE_TOON_SUCCESS':
            return {
                ...state,
                deleteToonLoading: false,
                deleteToonError: null,
                toons: toons.filter((item)=>item.id!==action.payload)
            } 
    
    case 'DELETE_TOON_FAILURE':
            return {
                ...state,
                deleteToonLoading: false,
                deleteToonError: action.payload,
            } 
    default:
        return state;
    }
  }
  
  export default mytoon;