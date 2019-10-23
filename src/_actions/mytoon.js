export const getMyToonStarted = () => {
  return {
    type: 'GET_MY_TOON_STARTED'
  }
}
export const getMyToonSuccess = (data) => {
  return {
    type: 'GET_MY_TOON_SUCCESS',
    payload: data
  }
}
export const getMyToonFailure = (data) => {
  return {
    type: 'GET_MY_TOON_FAILURE',
    payload: data
  }
}

export const getUpdateToonStarted = () => {
  return {
    type: 'GET_UPDATE_TOON_STARTED'
  }
}

export const getUpdateToonSuccess = (data) => {
  return {
    type: 'GET_UPDATE_TOON_SUCCESS',
    payload: data
  }
}

export const getUpdateToonFailure = (data) => {
  return {
    type: 'GET_UPDATE_TOON_FAILURE',
    payload: data
  }
}

export const createToonStarted = () => {
  return {
    type: 'CREATE_TOON_STARTED'
  }
}

export const createToonSuccess = (data) => {
  return {
    type: 'CREATE_TOON_SUCCESS',
    payload: data
  }
}

export const createToonFailure = (data) => {
  return {
    type: 'CREATE_TOON_FAILURE',
    payload: data
  }
}


export const createEpisodeStarted = () => {
  return {
    type: 'CREATE_EPISODE_STARTED'
  }
}

export const createEpisodeSuccess = (data) => {
  return {
    type: 'CREATE_EPISODE_SUCCESS',
    payload: data
  }
}

export const createEpisodeFailure = (data) => {
  return {
    type: 'CREATE_EPISODE_FAILURE',
    payload: data
  }
}

export const resetCreateEpisode = () => {
  return {
    type: 'RESET_CREATE_EPISODE_SUCCESS'
  }
}

export const resetToonTemp = () => {
  return {
    type: 'RESET_TOON_TEMP'
  }
}

export const deleteToonStarted = () => {
  return {
    type: 'DELETE_TOON_STARTED'
  }
}

export const deleteToonSuccess = (data) => {
  return {
    type: 'DELETE_TOON_SUCCESS',
    payload: data
  }
}

export const deleteToonFailure = (data) => {
  return {
    type: 'DELETE_TOON_FAILURE',
    payload: data
  }
}

export const uploadImageEpisodeStarted = () => {
  return {
    type: 'UPLOAD_IMAGE_EPISODE_STARTED'
  }
}

export const uploadImageEpisodeSuccess = (data) => {
  return {
    type: 'UPLOAD_IMAGE_EPISODE_SUCCESS',
    payload:data
  }
}

export const uploadImageEpisodeFailure = (data) => {
  return {
    type: 'UPLOAD_IMAGE_EPISODE_FAILURE',
    payload:data
  }
}

export const resetUploadImageEpisodeSuccess = () => {
  return {
    type: 'RESET_UPLOAD_IMAGE_EPISODE_SUCCESS'
  }
}

export const updateEpisodeStarted = () => {
  return {
    type: 'UPDATE_EPISODE_STARTED'
  }
}

export const updateEpisodeSuccess = (data) => {
  return {
    type: 'UPDATE_EPISODE_SUCCESS',
    payload: data
  }
}

export const updateEpisodeFailure = (data) => {
  return {
    type: 'UPDATE_EPISODE_FAILURE',
    payload: data
  }
}

export const deleteEpisodeStarted = () => {
  return {
    type: 'DELETE_EPISODE_STARTED'
  }
}
export const deleteEpisodeSuccess = (data) => {
  return {
    type: 'DELETE_EPISODE_SUCCESS',
    payload: data
  }
}
export const deleteEpisodeFailure = (data) => {
  return {
    type: 'DELETE_EPISODE_FAILURE',
    payload: data
  }
}
export const resetDeleteEpisodeSuccess = () => {
  return {
    type: 'RESET_DELETE_EPISODE_SUCCESS'
  }
}