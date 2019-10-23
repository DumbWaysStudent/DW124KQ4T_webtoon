const initialState = {
    isLoading: false,
    data: null,
    isLoginAuthLoading: true,
    data:null,
    loginAuthError: null,
    isRegisterAuthLoading: false,
    registerAuthError: null
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
      case 'LOGIN_AUTH_STARTED':
        return {
          ...state,
          isLoginAuthLoading: true,
          data:null,
          loginAuthError: null
        } 
      
      case 'LOGIN_AUTH_SUCCESS':
        return {
          ...state,
          isLoginAuthLoading: false,
          data:action.payload,
          loginAuthError: null
        } 
      
      case 'LOGIN_AUTH_FAILURE':
        return {
          ...state,
          isLoginAuthLoading: false,
          data: null,
          loginAuthError: action.payload
        } 
      case 'REGISTER_AUTH_STARTED':
        return {
          ...state,
          isRegisterAuthLoading: true,
          data: null,
          registerAuthError: null
        }
      
      case 'REGISTER_AUTH_SUCCESS':
        return {
          ...state,
          isRegisterAuthLoading: false,
          data: action.payload,
          registerAuthError: null
        }
      
      case 'REGISTER_AUTH_SUCCESS':
        return {
          ...state,
          isRegisterAuthLoading: false,
          data: null,
          registerAuthError: action.payload
        }
      case 'RESET_AUTH':
          return {
            ...state,
            isLoginAuthLoading: false,
            data: null,
            loginAuthError: null
          } 
      default:
        return state;
    }
  }
  
  export default auth;