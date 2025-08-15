const reducer = (state = '', action) => {
  if (action.type === 'SET_FILTER') {
    return action.payload
  }
  return state
}

export const setFilter = (newFilter) => {
  return {
    type: 'SET_FILTER',
    payload: newFilter
  }
}

export default reducer