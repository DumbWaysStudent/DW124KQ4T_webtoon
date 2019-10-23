export const getAllToonStarted = () => {
  return {
    type: 'GET_ALL_TOON_PENDING',
  }
}

export const getAllToonSuccess = (data) => {
  return {
    type: 'GET_ALL_TOON_SUCCESS',
    payload: data
  }
}

export const getAllToonFailure = (data) => {
  return {
    type: 'GET_ALL_TOON_FAILURE',
    payload: data
  }
}

export const getBannerToonStarted = () => {
  return {
    type: 'GET_BANNER_TOON_PENDING',
  }
}

export const getBannerToonSuccess = (data) => {
  return {
    type: 'GET_BANNER_TOON_SUCCESS',
    payload: data
  }
}

export const getBannerToonFailure = (data) => {
  return {
    type: 'GET_BANNER_TOON_FAILURE',
    payload: data
  }
}

export const getFavoriteToonStarted = () => {
  return {
    type: 'GET_FAVORITE_TOON_PENDING',
  }
}

export const getFavoriteToonSuccess = (data) => {
  return {
    type: 'GET_FAVORITE_TOON_SUCCESS',
    payload: data
  }
}

export const getFavoriteToonFailure = (data) => {
  return {
    type: 'GET_FAVORITE_TOON_FAILURE',
    payload: data
  }
}

export const getSearchStarted = () => {
  return {
    type: 'GET_SEARCH_PENDING',
  }
}

export const getSearchSuccess = (data) => {
  return {
    type: 'GET_SEARCH_SUCCESS',
    payload: data
  }
}

export const getSearchFailure = (data) => {
  return {
    type: 'GET_SEARCH_FAILURE',
    payload: data
  }
}

export const getDetailToonStarted = () => {
  return {
    type: 'GET_DETAIL_TOON_PENDING',
  }
}

export const getDetailToonSuccess = (data) => {
  return {
    type: 'GET_DETAIL_TOON_SUCCESS',
    payload: data
  }
}

export const getDetailToonFailure = (data) => {
  return {
    type: 'GET_DETAIL_TOON_FAILURE',
    payload: data
  }
}

export const getEpisodeToonStarted = () => {
  return {
    type: 'GET_EPISODE_TOON_PENDING',
  }
}

export const getEpisodeToonSuccess = (data) => {
  return {
    type: 'GET_EPISODE_TOON_SUCCESS',
    payload: data
  }
}

export const getEpisodeToonFailure = (data) => {
  return {
    type: 'GET_EPISODE_TOON_FAILURE',
    payload: data
  }
}

export const getImageEpisodeStarted = () => {
  return {
    type: 'GET_IMAGE_EPISODE_STARTED'
  }
}

export const getImageEpisodeSuccess = (data) => {
  return {
    type: 'GET_IMAGE_EPISODE_SUCCESS',
    payload: data
  }
}

export const getImageEpisodeFailure = (data) => {
  return {
    type: 'GET_IMAGE_EPISODE_FAILURE',
    payload: data
  }
}

export const addImageToEpisode = (data) => {
  return {
    type: 'ADD_IMAGE_TO_EPISODE',
    payload: data
  }
}