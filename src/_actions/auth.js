
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