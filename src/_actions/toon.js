
export const saveBanner = (data) => {
    return {
      type: 'SAVE_BANNER',
      payload: data
    }
  }
  
export const saveFavorite = (data) => {
    return {
      type: 'SAVE_FAVORITE',
      payload: data
    }
  }
  
export const saveAll = (data) => {
  return {
    type: 'SAVE_ALL',
    payload: data
  }
}