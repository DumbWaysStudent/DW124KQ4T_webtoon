const initialState = {
    toons: [],
    newToon: null,
    editToon: null,
    tempToons: [],
    tempEpisode: [],
    newEpisode: null,
    editEpisode: null
}

const mytoon = (state = initialState, action) => {
    switch (action.type) {
    case 'SAVE_TOON':
        return {
            ...state,
            toons: action.payload,
        }
    case 'SAVE_NEW_TOON':
            return {
                ...state,
                newToon: action.payload,
            }
    
    case 'SAVE_UPDATED_TOON':
            return {
                ...state,
                editToon: action.payload,
            }
    case 'SAVE_TOON_TEMP':
            return {
                ...state,
                tempToons: action.payload,
            }
    
    case 'SAVE_EPISODE_TEMP':
            return {
                ...state,
                tempEpisode: action.payload,
            }
    
    case 'SAVE_NEW_EPISODE':
            return {
                ...state,
                newEpisode: action.payload,
            }
    
    case 'SAVE_UPDATED_EPISODE':
            return {
                ...state,
                editEpisode: action.payload,
            }

    default:
        return state;
    }
  }
  
  export default mytoon;