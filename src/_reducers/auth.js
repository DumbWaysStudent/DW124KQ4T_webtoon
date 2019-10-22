const initialState = {
    data: null,
    isLoading: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_AUTH':
        return {
          ...state,
          data: action.payload,
          isLoading: false
        }
      case 'SAVE_AUTH_PENDING':
        return {
          ...state,
          isLoading: true
        }  
      default:
        return state;
    }
  }
  
  export default auth;