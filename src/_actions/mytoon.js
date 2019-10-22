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