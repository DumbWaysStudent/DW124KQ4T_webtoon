
export const saveToon = (data) => {
    return {
      type: 'SAVE_TOON',
      payload: data
    }
}
export const saveNewToon = (data) => {
    return {
      type: 'SAVE_NEW_TOON',
      payload: data
    }
}

export const saveUpdatedToon = (data)=>{
    return {
        type: 'SAVE_UPDATED_TOON',
        payload: data
    }
}

export const saveToonTemp = (data)=>{
  return {
      type: 'SAVE_TOON_TEMP',
      payload: data
  }
}

export const saveEpisodeTemp = (data)=>{
  return {
      type: 'SAVE_EPISODE_TEMP',
      payload: data
  }
}

export const saveNewEpisode = (data)=>{
  return {
      type: 'SAVE_NEW_EPISODE',
      payload: data
  }
}

export const saveUpdatedEpisode = (data)=>{
  return {
      type: 'SAVE_UPDATED_EPISODE',
      payload: data
  }
}