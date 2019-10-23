
export const saveAuth = (data) => {
    return {
      type: 'SAVE_AUTH',
      payload: data
    }
  }
  
export const saveAuthPending = () => {
  return {
    type: 'SAVE_AUTH_PENDING'
  }
}

export const loginStarted = () => {
  return {
    type: 'LOGIN_AUTH_STARTED'
  }
}
export const loginSuccess = (data) => {
  return {
    type: 'LOGIN_AUTH_SUCCESS',
    payload: data
  }
}
export const loginFailure = (data) => {
  return {
    type: 'LOGIN_AUTH_FAILURE',
    payload: data
  }
}
export const registerAuthStarted = () => {
  return{
    type: 'REGISTER_AUTH_STARTED'
  }
}
export const registerAuthSuccess = (data) => {
  return{
    type: 'REGISTER_AUTH_SUCCESS',
    payload: data
  }
}
export const registerAuthFailure = (data) => {
  return{
    type: 'REGISTER_AUTH_FAILURE',
    payload: data
  }
}
export const resetAuth = () => {
  return {
    type: 'RESET_AUTH'
  }
}
export const changePhotoStarted = () =>{
  return {
    type: 'CHANGE_PHOTO_STARTED'
  }
}
export const changePhotoSuccess = (data) =>{
  return {
    type: 'CHANGE_PHOTO_SUCCESS',
    payload: data
  }
}
export const changePhotoFailure = (data) =>{
  return {
    type: 'CHANGE_PHOTO_FAILURE',
    payload: data
  }
}
export const changePhotoReset = () =>{
  return {
    type: 'RESET_CHANGE_PHOTO',
  }
}