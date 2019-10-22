const initialState = {
    banners: [],
    favorites: [],
    all: []
}

const toon = (state = initialState, action) => {
    switch (action.type) {
    case 'SAVE_BANNER':
        return {
            ...state,
            banners: action.payload,
        }
    case 'SAVE_FAVORITE':
        return {
            ...state,
            favorites: action.payload,
        } 
    case 'SAVE_ALL':
        return {
            ...state,
            all: action.payload,
        }  
    default:
        return state;
    }
  }
  
  export default toon;